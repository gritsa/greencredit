using Microsoft.EntityFrameworkCore.Migrations;

namespace GreentableApi.Migrations
{
    public partial class Initial09 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "postid",
                table: "GreenCoins",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "postid",
                table: "GreenCoins");
        }
    }
}
