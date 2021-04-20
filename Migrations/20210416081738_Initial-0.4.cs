using Microsoft.EntityFrameworkCore.Migrations;

namespace GreentableApi.Migrations
{
    public partial class Initial04 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "likes",
                table: "homeContent");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "likes",
                table: "homeContent",
                type: "text",
                nullable: true);
        }
    }
}
