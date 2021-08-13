using Microsoft.EntityFrameworkCore.Migrations;

namespace GreentableApi.Migrations
{
    public partial class Initial03 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "name",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "contactnumber",
                table: "Profile");

            migrationBuilder.DropColumn(
                name: "description",
                table: "Profile");

            migrationBuilder.DropColumn(
                name: "description",
                table: "homeContent");

            migrationBuilder.DropColumn(
                name: "posttype",
                table: "homeContent");

            migrationBuilder.AddColumn<string>(
                name: "profilemedia",
                table: "Profile",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "comments",
                table: "homeContent",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "likes",
                table: "homeContent",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "posttext",
                table: "homeContent",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "profileid",
                table: "homeContent",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "share",
                table: "homeContent",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "profilemedia",
                table: "Profile");

            migrationBuilder.DropColumn(
                name: "comments",
                table: "homeContent");

            migrationBuilder.DropColumn(
                name: "likes",
                table: "homeContent");

            migrationBuilder.DropColumn(
                name: "posttext",
                table: "homeContent");

            migrationBuilder.DropColumn(
                name: "profileid",
                table: "homeContent");

            migrationBuilder.DropColumn(
                name: "share",
                table: "homeContent");

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "contactnumber",
                table: "Profile",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Profile",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "homeContent",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "posttype",
                table: "homeContent",
                type: "text",
                nullable: true);
        }
    }
}
