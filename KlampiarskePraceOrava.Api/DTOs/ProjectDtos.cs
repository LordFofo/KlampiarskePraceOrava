namespace KlampiarskePraceOrava.Api.DTOs;

public record ProjectListDto(int Id, string Title, string Category, bool IsPublished, DateTime CreatedAt, int ImageCount, int VideoCount, int? CoverImageId);

public record ProjectDetailDto(
    int Id,
    string Title,
    string? Description,
    string Category,
    bool IsPublished,
    DateTime CreatedAt,
    int? CoverImageId,
    List<ProjectImageDto> Images,
    List<ProjectVideoDto> Videos
);

public record ProjectImageDto(int Id, string? Caption, int Order);
public record ProjectVideoDto(int Id, string? Caption);

public record CreateProjectDto(string Title, string? Description, string Category);
public record UpdateProjectDto(string Title, string? Description, string Category, bool IsPublished);
public record ImageOrderDto(int ImageId, int Order);
