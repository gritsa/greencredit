using Microsoft.EntityFrameworkCore.Migrations;

namespace GreentableApi.Migrations
{
    public partial class Initial07 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "comments",
                table: "homeContent",
                type: "jsonb",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "comments",
                table: "homeContent");
        }
    }
}
