using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class MatchPlayer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PlayerEntityId",
                table: "PlayerPoints",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PlayerId",
                table: "PlayerPoints",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "MatchPlayerEntity",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IsOnCourt = table.Column<bool>(nullable: false),
                    PlayerId = table.Column<bool>(nullable: false),
                    PlayerEntityId = table.Column<int>(nullable: true),
                    MatchId = table.Column<int>(nullable: false),
                    MatchEntityId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchPlayerEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchPlayerEntity_Matches_MatchEntityId",
                        column: x => x.MatchEntityId,
                        principalTable: "Matches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MatchPlayerEntity_Players_PlayerEntityId",
                        column: x => x.PlayerEntityId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlayerPoints_PlayerEntityId",
                table: "PlayerPoints",
                column: "PlayerEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPlayerEntity_MatchEntityId",
                table: "MatchPlayerEntity",
                column: "MatchEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPlayerEntity_PlayerEntityId",
                table: "MatchPlayerEntity",
                column: "PlayerEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerPoints_Players_PlayerEntityId",
                table: "PlayerPoints",
                column: "PlayerEntityId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayerPoints_Players_PlayerEntityId",
                table: "PlayerPoints");

            migrationBuilder.DropTable(
                name: "MatchPlayerEntity");

            migrationBuilder.DropIndex(
                name: "IX_PlayerPoints_PlayerEntityId",
                table: "PlayerPoints");

            migrationBuilder.DropColumn(
                name: "PlayerEntityId",
                table: "PlayerPoints");

            migrationBuilder.DropColumn(
                name: "PlayerId",
                table: "PlayerPoints");
        }
    }
}
