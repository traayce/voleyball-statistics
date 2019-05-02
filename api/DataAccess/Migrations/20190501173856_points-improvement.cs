using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class pointsimprovement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SetNumber",
                table: "MatchPoints",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "MatchPoints",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MatchPoints_TeamId",
                table: "MatchPoints",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPoints_Teams_TeamId",
                table: "MatchPoints",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchPoints_Teams_TeamId",
                table: "MatchPoints");

            migrationBuilder.DropIndex(
                name: "IX_MatchPoints_TeamId",
                table: "MatchPoints");

            migrationBuilder.DropColumn(
                name: "SetNumber",
                table: "MatchPoints");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "MatchPoints");
        }
    }
}
