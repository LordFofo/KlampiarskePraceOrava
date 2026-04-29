namespace KlampiarskePraceOrava.Api.Data.Models;

public class ProjectImage
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public byte[] Data { get; set; } = [];
    public string ContentType { get; set; } = string.Empty;
    public string? Caption { get; set; }
    public int Order { get; set; }
}
