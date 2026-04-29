using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KlampiarskePraceOrava.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCoverImageId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CoverImageId",
                table: "Projects",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverImageId",
                table: "Projects");
        }
    }
}
