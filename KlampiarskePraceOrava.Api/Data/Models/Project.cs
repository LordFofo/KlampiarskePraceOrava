namespace KlampiarskePraceOrava.Api.Data.Models;

public class Project
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Category { get; set; } = string.Empty;
    public bool IsPublished { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int? CoverImageId { get; set; }

    public List<ProjectImage> Images { get; set; } = [];
    public List<ProjectVideo> Videos { get; set; } = [];
}
