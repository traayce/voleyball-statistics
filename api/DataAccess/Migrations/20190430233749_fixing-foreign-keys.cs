using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class fixingforeignkeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayerEntity_Matches_MatchEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayerEntity_Players_PlayerEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayerEntity_Teams_TeamEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPoints_Matches_MatchEntityId",
                table: "MatchPoints");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerPoints_MatchPoints_MatchPointEntityId",
                table: "PlayerPoints");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerPoints_Players_PlayerEntityId",
                table: "PlayerPoints");

            migrationBuilder.DropIndex(
                name: "IX_PlayerPoints_MatchPointEntityId",
                table: "PlayerPoints");

            migrationBuilder.DropIndex(
                name: "IX_PlayerPoints_PlayerEntityId",
                table: "PlayerPoints");

            migrationBuilder.DropIndex(
                name: "IX_MatchPoints_MatchEntityId",
                table: "MatchPoints");

            migrationBuilder.DropIndex(
                name: "IX_MatchPlayerEntity_MatchEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropIndex(
                name: "IX_MatchPlayerEntity_PlayerEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropIndex(
                name: "IX_MatchPlayerEntity_TeamEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropColumn(
                name: "MatchPointEntityId",
                table: "PlayerPoints");

            migrationBuilder.DropColumn(
                name: "PlayerEntityId",
                table: "PlayerPoints");

            migrationBuilder.DropColumn(
                name: "MatchEntityId",
                table: "MatchPoints");

            migrationBuilder.DropColumn(
                name: "MatchEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropColumn(
                name: "PlayerEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropColumn(
                name: "TeamEntityId",
                table: "MatchPlayerEntity");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerPoints_MatchPointId",
                table: "PlayerPoints",
                column: "MatchPointId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerPoints_PlayerId",
                table: "PlayerPoints",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPoints_MatchId",
                table: "MatchPoints",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPlayerEntity_MatchId",
                table: "MatchPlayerEntity",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPlayerEntity_PlayerId",
                table: "MatchPlayerEntity",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPlayerEntity_TeamId",
                table: "MatchPlayerEntity",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayerEntity_Matches_MatchId",
                table: "MatchPlayerEntity",
                column: "MatchId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayerEntity_Players_PlayerId",
                table: "MatchPlayerEntity",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayerEntity_Teams_TeamId",
                table: "MatchPlayerEntity",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPoints_Matches_MatchId",
                table: "MatchPoints",
                column: "MatchId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerPoints_MatchPoints_MatchPointId",
                table: "PlayerPoints",
                column: "MatchPointId",
                principalTable: "MatchPoints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerPoints_Players_PlayerId",
                table: "PlayerPoints",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayerEntity_Matches_MatchId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayerEntity_Players_PlayerId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayerEntity_Teams_TeamId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPoints_Matches_MatchId",
                table: "MatchPoints");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerPoints_MatchPoints_MatchPointId",
                table: "PlayerPoints");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerPoints_Players_PlayerId",
                table: "PlayerPoints");

            migrationBuilder.DropIndex(
                name: "IX_PlayerPoints_MatchPointId",
                table: "PlayerPoints");

            migrationBuilder.DropIndex(
                name: "IX_PlayerPoints_PlayerId",
                table: "PlayerPoints");

            migrationBuilder.DropIndex(
                name: "IX_MatchPoints_MatchId",
                table: "MatchPoints");

            migrationBuilder.DropIndex(
                name: "IX_MatchPlayerEntity_MatchId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropIndex(
                name: "IX_MatchPlayerEntity_PlayerId",
                table: "MatchPlayerEntity");

            migrationBuilder.DropIndex(
                name: "IX_MatchPlayerEntity_TeamId",
                table: "MatchPlayerEntity");

            migrationBuilder.AddColumn<int>(
                name: "MatchPointEntityId",
                table: "PlayerPoints",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PlayerEntityId",
                table: "PlayerPoints",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MatchEntityId",
                table: "MatchPoints",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MatchEntityId",
                table: "MatchPlayerEntity",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PlayerEntityId",
                table: "MatchPlayerEntity",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TeamEntityId",
                table: "MatchPlayerEntity",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PlayerPoints_MatchPointEntityId",
                table: "PlayerPoints",
                column: "MatchPointEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerPoints_PlayerEntityId",
                table: "PlayerPoints",
                column: "PlayerEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPoints_MatchEntityId",
                table: "MatchPoints",
                column: "MatchEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPlayerEntity_MatchEntityId",
                table: "MatchPlayerEntity",
                column: "MatchEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPlayerEntity_PlayerEntityId",
                table: "MatchPlayerEntity",
                column: "PlayerEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPlayerEntity_TeamEntityId",
                table: "MatchPlayerEntity",
                column: "TeamEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayerEntity_Matches_MatchEntityId",
                table: "MatchPlayerEntity",
                column: "MatchEntityId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayerEntity_Players_PlayerEntityId",
                table: "MatchPlayerEntity",
                column: "PlayerEntityId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayerEntity_Teams_TeamEntityId",
                table: "MatchPlayerEntity",
                column: "TeamEntityId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPoints_Matches_MatchEntityId",
                table: "MatchPoints",
                column: "MatchEntityId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerPoints_MatchPoints_MatchPointEntityId",
                table: "PlayerPoints",
                column: "MatchPointEntityId",
                principalTable: "MatchPoints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerPoints_Players_PlayerEntityId",
                table: "PlayerPoints",
                column: "PlayerEntityId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
