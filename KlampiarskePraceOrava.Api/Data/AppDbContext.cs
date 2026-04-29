using KlampiarskePraceOrava.Api.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace KlampiarskePraceOrava.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectImage> ProjectImages => Set<ProjectImage>();
    public DbSet<ProjectVideo> ProjectVideos => Set<ProjectVideo>();
    public DbSet<ContactInquiry> ContactInquiries => Set<ContactInquiry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>(e =>
        {
            e.HasKey(p => p.Id);
            e.Property(p => p.Title).IsRequired().HasMaxLength(200);
            e.Property(p => p.Category).IsRequired().HasMaxLength(100);
            e.HasMany(p => p.Images).WithOne(i => i.Project).HasForeignKey(i => i.ProjectId).OnDelete(DeleteBehavior.Cascade);
            e.HasMany(p => p.Videos).WithOne(v => v.Project).HasForeignKey(v => v.ProjectId).OnDelete(DeleteBehavior.Cascade);
            e.Property(p => p.CoverImageId).IsRequired(false);
        });

        modelBuilder.Entity<ProjectImage>(e =>
        {
            e.HasKey(i => i.Id);
            e.Property(i => i.ContentType).IsRequired().HasMaxLength(100);
        });

        modelBuilder.Entity<ProjectVideo>(e =>
        {
            e.HasKey(v => v.Id);
            e.Property(v => v.ContentType).IsRequired().HasMaxLength(100);
        });

        modelBuilder.Entity<ContactInquiry>(e =>
        {
            e.HasKey(i => i.Id);
            e.Property(i => i.Name).IsRequired().HasMaxLength(100);
            e.Property(i => i.Phone).IsRequired().HasMaxLength(30);
        });
    }
}
