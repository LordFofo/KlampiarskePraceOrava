using KlampiarskePraceOrava.Api.Data;
using KlampiarskePraceOrava.Api.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KlampiarskePraceOrava.Api.Controllers;

[ApiController]
[Route("api/reviews")]
public class ReviewsController(AppDbContext db) : ControllerBase
{
    public record SubmitReviewDto(string Name, string Text);

    [HttpGet]
    public async Task<IActionResult> GetApproved()
    {
        var reviews = await db.Reviews
            .Where(r => r.IsApproved)
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => new { r.Id, r.Name, r.Text, r.CreatedAt })
            .ToListAsync();
        return Ok(reviews);
    }

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] SubmitReviewDto dto)
    {
        var review = new Review
        {
            Name = dto.Name.Trim(),
            Text = dto.Text.Trim(),
            CreatedAt = DateTime.UtcNow,
            IsApproved = false
        };
        db.Reviews.Add(review);
        await db.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("admin")]
    [Authorize]
    public async Task<IActionResult> GetAll()
    {
        var reviews = await db.Reviews
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => new { r.Id, r.Name, r.Text, r.CreatedAt, r.IsApproved })
            .ToListAsync();
        return Ok(reviews);
    }

    [HttpPut("{id}/approve")]
    [Authorize]
    public async Task<IActionResult> Approve(int id)
    {
        var review = await db.Reviews.FindAsync(id);
        if (review is null) return NotFound();
        review.IsApproved = true;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var review = await db.Reviews.FindAsync(id);
        if (review is null) return NotFound();
        db.Reviews.Remove(review);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
