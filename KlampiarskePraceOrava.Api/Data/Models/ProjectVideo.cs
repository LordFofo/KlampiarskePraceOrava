namespace KlampiarskePraceOrava.Api.Data.Models;

public class ProjectVideo
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public byte[] Data { get; set; } = [];
    public string ContentType { get; set; } = string.Empty;
    public string? Caption { get; set; }
}
