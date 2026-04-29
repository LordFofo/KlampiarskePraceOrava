using KlampiarskePraceOrava.Api.Data;
using KlampiarskePraceOrava.Api.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace KlampiarskePraceOrava.Api.Controllers;

[ApiController]
[Route("api/contact")]
public class ContactController(AppDbContext db) : ControllerBase
{
    public record ContactInquiryDto(string Name, string Phone, string? Message);

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactInquiryDto dto)
    {
        var inquiry = new ContactInquiry
        {
            Name = dto.Name.Trim(),
            Phone = dto.Phone.Trim(),
            Message = dto.Message?.Trim(),
            CreatedAt = DateTime.UtcNow,
            IsRead = false
        };

        db.ContactInquiries.Add(inquiry);
        await db.SaveChangesAsync();
        return Ok();
    }
}
