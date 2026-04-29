using KlampiarskePraceOrava.Api.Data;
using KlampiarskePraceOrava.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KlampiarskePraceOrava.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? category)
    {
        var query = db.Projects
            .Where(p => p.IsPublished)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(category))
            query = query.Where(p => p.Category == category);

        var projects = await query
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
            .FirstOrDefaultAsync(p => p.Id == id && p.IsPublished);

        if (project is null) return NotFound();

        var dto = new ProjectDetailDto(
            project.Id, project.Title, project.Description, project.Category,
            project.IsPublished, project.CreatedAt, project.CoverImageId,
            project.Images.Select(i => new ProjectImageDto(i.Id, i.Caption, i.Order)).ToList(),
            project.Videos.Select(v => new ProjectVideoDto(v.Id, v.Caption)).ToList()
        );

        return Ok(dto);
    }

    [HttpGet("images/{imageId}")]
    public async Task<IActionResult> GetImage(int imageId)
    {
        var image = await db.ProjectImages.FindAsync(imageId);
        if (image is null) return NotFound();
        return File(image.Data, image.ContentType);
    }

    [HttpGet("videos/{videoId}")]
    public async Task<IActionResult> GetVideo(int videoId)
    {
        var video = await db.ProjectVideos.FindAsync(videoId);
        if (video is null) return NotFound();
        return File(video.Data, video.ContentType);
    }
}
