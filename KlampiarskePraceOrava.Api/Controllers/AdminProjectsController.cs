using KlampiarskePraceOrava.Api.Data;
using KlampiarskePraceOrava.Api.Data.Models;
using KlampiarskePraceOrava.Api.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KlampiarskePraceOrava.Api.Controllers;

[ApiController]
[Route("api/admin/projects")]
[Authorize]
public class AdminProjectsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var projects = await db.Projects
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new ProjectListDto(
                p.Id, p.Title, p.Category, p.IsPublished, p.CreatedAt,
                p.Images.Count, p.Videos.Count,
                p.CoverImageId ?? p.Images.OrderBy(i => i.Order).Select(i => (int?)i.Id).FirstOrDefault()))
            .ToListAsync();

        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var project = await db.Projects
            .Include(p => p.Images.OrderBy(i => i.Order))
            .Include(p => p.Videos)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project is null) return NotFound();

        var dto = new ProjectDetailDto(
            project.Id, project.Title, project.Description, project.Category,
            project.IsPublished, project.CreatedAt, project.CoverImageId,
            project.Images.Select(i => new ProjectImageDto(i.Id, i.Caption, i.Order)).ToList(),
            project.Videos.Select(v => new ProjectVideoDto(v.Id, v.Caption)).ToList()
        );

        return Ok(dto);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProjectDto dto)
    {
        var project = new Project
        {
            Title = dto.Title,
            Description = dto.Description,
            Category = dto.Category,
            IsPublished = true,
            CreatedAt = DateTime.UtcNow
        };

        db.Projects.Add(project);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = project.Id }, new { project.Id });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProjectDto dto)
    {
        var project = await db.Projects.FindAsync(id);
        if (project is null) return NotFound();

        project.Title = dto.Title;
        project.Description = dto.Description;
        project.Category = dto.Category;
        project.IsPublished = dto.IsPublished;

        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var project = await db.Projects.FindAsync(id);
        if (project is null) return NotFound();

        db.Projects.Remove(project);
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("{id}/images")]
    [RequestSizeLimit(100 * 1024 * 1024)]
    public async Task<IActionResult> UploadImage(int id, IFormFile file, [FromForm] string? caption, [FromForm] int order = 0)
    {
        var project = await db.Projects.FindAsync(id);
        if (project is null) return NotFound();

        if (!file.ContentType.StartsWith("image/"))
            return BadRequest(new { message = "Súbor musí byť obrázok." });

        using var ms = new MemoryStream();
        await file.CopyToAsync(ms);

        var image = new ProjectImage
        {
            ProjectId = id,
            Data = ms.ToArray(),
            ContentType = file.ContentType,
            Caption = caption,
            Order = order
        };

        db.ProjectImages.Add(image);
        await db.SaveChangesAsync();
        return Ok(new { image.Id });
    }

    [HttpDelete("{id}/images/{imageId}")]
    public async Task<IActionResult> DeleteImage(int id, int imageId)
    {
        var project = await db.Projects.FindAsync(id);
        if (project is null) return NotFound();

        var image = await db.ProjectImages.FirstOrDefaultAsync(i => i.Id == imageId && i.ProjectId == id);
        if (image is null) return NotFound();

        if (project.CoverImageId == imageId)
            project.CoverImageId = null;

        db.ProjectImages.Remove(image);
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{id}/cover/{imageId}")]
    public async Task<IActionResult> SetCover(int id, int imageId)
    {
        var project = await db.Projects.FindAsync(id);
        if (project is null) return NotFound();

        var imageExists = await db.ProjectImages.AnyAsync(i => i.Id == imageId && i.ProjectId == id);
        if (!imageExists) return NotFound();

        project.CoverImageId = imageId;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("{id}/videos")]
    [RequestSizeLimit(500 * 1024 * 1024)]
    public async Task<IActionResult> UploadVideo(int id, IFormFile file, [FromForm] string? caption)
    {
        var project = await db.Projects.FindAsync(id);
        if (project is null) return NotFound();

        if (!file.ContentType.StartsWith("video/"))
            return BadRequest(new { message = "Súbor musí byť video." });

        using var ms = new MemoryStream();
        await file.CopyToAsync(ms);

        var video = new ProjectVideo
        {
            ProjectId = id,
            Data = ms.ToArray(),
            ContentType = file.ContentType,
            Caption = caption
        };

        db.ProjectVideos.Add(video);
        await db.SaveChangesAsync();
        return Ok(new { video.Id });
    }

    [HttpDelete("{id}/videos/{videoId}")]
    public async Task<IActionResult> DeleteVideo(int id, int videoId)
    {
        var video = await db.ProjectVideos.FirstOrDefaultAsync(v => v.Id == videoId && v.ProjectId == id);
        if (video is null) return NotFound();

        db.ProjectVideos.Remove(video);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
