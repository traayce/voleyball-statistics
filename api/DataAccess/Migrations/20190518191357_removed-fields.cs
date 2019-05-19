using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class removedfields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayerEntity_Matches_MatchEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayerEntity_Players_PlayerId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPoints_Matches_MatchId",
                table: "MatchPoints");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPoints_Teams_TeamId",
                table: "MatchPoints");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerPoints_MatchPoints_MatchPointEntityId",
                table: "PlayerPoints");

            migrationBuilder.DropIndex(
                name: "IX_PlayerPoints_MatchPointEntityId",
                table: "PlayerPoints");

            migrationBuilder.DropIndex(
                name: "IX_MatchPoints_MatchId",
                table: "MatchPoints");

            migrationBuilder.DropIndex(
                name: "IX_MatchPoints_TeamId",
                table: "MatchPoints");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MatchPlayerEntity",
                table: "MatchPlayerEntity");

            migrationBuilder.DropColumn(
                name: "MatchPointEntityId",
                table: "PlayerPoints");

            migrationBuilder.RenameTable(
                name: "MatchPlayerEntity",
                newName: "MatchPlayers");

            migrationBuilder.RenameIndex(
                name: "IX_MatchPlayerEntity_PlayerId",
                table: "MatchPlayers",
                newName: "IX_MatchPlayers_PlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_MatchPlayerEntity_MatchEntityId",
                table: "MatchPlayers",
                newName: "IX_MatchPlayers_MatchEntityId");

            migrationBuilder.AddColumn<int>(
                name: "MatchEntityId",
                table: "MatchPoints",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MatchPlayers",
                table: "MatchPlayers",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPoints_MatchEntityId",
                table: "MatchPoints",
                column: "MatchEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayers_Matches_MatchEntityId",
                table: "MatchPlayers",
                column: "MatchEntityId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayers_Players_PlayerId",
                table: "MatchPlayers",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPoints_Matches_MatchEntityId",
                table: "MatchPoints",
                column: "MatchEntityId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayers_Matches_MatchEntityId",
                table: "MatchPlayers");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayers_Players_PlayerId",
                table: "MatchPlayers");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPoints_Matches_MatchEntityId",
                table: "MatchPoints");

            migrationBuilder.DropIndex(
                name: "IX_MatchPoints_MatchEntityId",
                table: "MatchPoints");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MatchPlayers",
                table: "MatchPlayers");

            migrationBuilder.DropColumn(
                name: "MatchEntityId",
                table: "MatchPoints");

            migrationBuilder.RenameTable(
                name: "MatchPlayers",
                newName: "MatchPlayerEntity");

            migrationBuilder.RenameIndex(
                name: "IX_MatchPlayers_PlayerId",
                table: "MatchPlayerEntity",
                newName: "IX_MatchPlayerEntity_PlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_MatchPlayers_MatchEntityId",
                table: "MatchPlayerEntity",
                newName: "IX_MatchPlayerEntity_MatchEntityId");

            migrationBuilder.AddColumn<int>(
                name: "MatchPointEntityId",
                table: "PlayerPoints",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MatchPlayerEntity",
                table: "MatchPlayerEntity",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerPoints_MatchPointEntityId",
                table: "PlayerPoints",
                column: "MatchPointEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPoints_MatchId",
                table: "MatchPoints",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPoints_TeamId",
                table: "MatchPoints",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayerEntity_Matches_MatchEntityId",
                table: "MatchPlayerEntity",
                column: "MatchEntityId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayerEntity_Players_PlayerId",
                table: "MatchPlayerEntity",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPoints_Matches_MatchId",
                table: "MatchPoints",
                column: "MatchId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPoints_Teams_TeamId",
                table: "MatchPoints",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerPoints_MatchPoints_MatchPointEntityId",
                table: "PlayerPoints",
                column: "MatchPointEntityId",
                principalTable: "MatchPoints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
