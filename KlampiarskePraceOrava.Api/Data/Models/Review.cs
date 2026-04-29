namespace KlampiarskePraceOrava.Api.Data.Models;

public class Review
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Text { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public bool IsApproved { get; set; }
}
