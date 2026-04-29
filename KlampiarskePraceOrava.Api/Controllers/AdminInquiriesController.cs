using KlampiarskePraceOrava.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KlampiarskePraceOrava.Api.Controllers;

[ApiController]
[Route("api/admin/inquiries")]
[Authorize]
public class AdminInquiriesController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await db.ContactInquiries
            .OrderByDescending(i => i.CreatedAt)
            .Select(i => new { i.Id, i.Name, i.Phone, i.Message, i.CreatedAt, i.IsRead })
            .ToListAsync();
        return Ok(list);
    }

    [HttpPut("{id}/read")]
    public async Task<IActionResult> MarkRead(int id)
    {
        var inquiry = await db.ContactInquiries.FindAsync(id);
        if (inquiry is null) return NotFound();
        inquiry.IsRead = true;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var inquiry = await db.ContactInquiries.FindAsync(id);
        if (inquiry is null) return NotFound();
        db.ContactInquiries.Remove(inquiry);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
