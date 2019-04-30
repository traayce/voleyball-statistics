using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class MatchPlayer2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TeamEntityId",
                table: "MatchPlayerEntity",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "MatchPlayerEntity",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MatchPlayerEntity_TeamEntityId",
                table: "MatchPlayerEntity",
                column: "TeamEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayerEntity_Teams_TeamEntityId",
                table: "MatchPlayerEntity",
                column: "TeamEntityId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayerEntity_Teams_TeamEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropIndex(
                name: "IX_MatchPlayerEntity_TeamEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropColumn(
                name: "TeamEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "MatchPlayerEntity");
        }
    }
}
