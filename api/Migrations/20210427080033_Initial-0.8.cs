using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace GreentableApi.Migrations
{
    public partial class Initial08 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lastname",
                table: "Profile");

            migrationBuilder.AddColumn<double>(
                name: "greenCoin",
                table: "homeContent",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "GreenCoins",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    profileid = table.Column<long>(nullable: false),
                    coins = table.Column<double>(nullable: false),
                    meta = table.Column<string>(type: "jsonb", nullable: true),
                    createdAt = table.Column<DateTime>(nullable: false),
                    createdBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GreenCoins", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GreenCoins");

            migrationBuilder.DropColumn(
                name: "greenCoin",
                table: "homeContent");

            migrationBuilder.AddColumn<string>(
                name: "lastname",
                table: "Profile",
                type: "text",
                nullable: true);
        }
    }
}
