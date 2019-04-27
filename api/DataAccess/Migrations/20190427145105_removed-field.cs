using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class removedfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMatchPoint",
                table: "PlayerPoints");

            migrationBuilder.DropColumn(
                name: "IsSetPoint",
                table: "PlayerPoints");

            migrationBuilder.DropColumn(
                name: "PointNumber",
                table: "PlayerPoints");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsMatchPoint",
                table: "PlayerPoints",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSetPoint",
                table: "PlayerPoints",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PointNumber",
                table: "PlayerPoints",
                nullable: false,
                defaultValue: 0);
        }
    }
}
