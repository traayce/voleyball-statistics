using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class typefix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PlayerId",
                table: "MatchPlayerEntity",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "MatchPlayerEntity",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "MatchPlayerEntity",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "MatchPlayerEntity",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UpdatedBy",
                table: "MatchPlayerEntity",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "MatchPlayerEntity");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "MatchPlayerEntity");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "MatchPlayerEntity");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "MatchPlayerEntity");

            migrationBuilder.AlterColumn<bool>(
                name: "PlayerId",
                table: "MatchPlayerEntity",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
