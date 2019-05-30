using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class removedsecretary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Users_SecretaryId",
                table: "Matches");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayers_Matches_MatchEntityId",
                table: "MatchPlayers");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPoints_Matches_MatchEntityId",
                table: "MatchPoints");

            migrationBuilder.DropIndex(
                name: "IX_MatchPoints_MatchEntityId",
                table: "MatchPoints");

            migrationBuilder.DropIndex(
                name: "IX_MatchPlayers_MatchEntityId",
                table: "MatchPlayers");

            migrationBuilder.DropIndex(
                name: "IX_Matches_SecretaryId",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "MatchEntityId",
                table: "MatchPoints");

            migrationBuilder.DropColumn(
                name: "MatchEntityId",
                table: "MatchPlayers");

            migrationBuilder.DropColumn(
                name: "SecretaryId",
                table: "Matches");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPoints_MatchId",
                table: "MatchPoints",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPlayers_MatchId",
                table: "MatchPlayers",
                column: "MatchId");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayers_Matches_MatchId",
                table: "MatchPlayers",
                column: "MatchId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPoints_Matches_MatchId",
                table: "MatchPoints",
                column: "MatchId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayers_Matches_MatchId",
                table: "MatchPlayers");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPoints_Matches_MatchId",
                table: "MatchPoints");

            migrationBuilder.DropIndex(
                name: "IX_MatchPoints_MatchId",
                table: "MatchPoints");

            migrationBuilder.DropIndex(
                name: "IX_MatchPlayers_MatchId",
                table: "MatchPlayers");

            migrationBuilder.AddColumn<int>(
                name: "MatchEntityId",
                table: "MatchPoints",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MatchEntityId",
                table: "MatchPlayers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SecretaryId",
                table: "Matches",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MatchPoints_MatchEntityId",
                table: "MatchPoints",
                column: "MatchEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPlayers_MatchEntityId",
                table: "MatchPlayers",
                column: "MatchEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_SecretaryId",
                table: "Matches",
                column: "SecretaryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Users_SecretaryId",
                table: "Matches",
                column: "SecretaryId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayers_Matches_MatchEntityId",
                table: "MatchPlayers",
                column: "MatchEntityId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPoints_Matches_MatchEntityId",
                table: "MatchPoints",
                column: "MatchEntityId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
