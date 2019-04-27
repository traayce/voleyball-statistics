using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class match : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Matches",
                columns: table => new
                {
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<int>(nullable: false),
                    UpdatedBy = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StartsAt = table.Column<DateTime>(nullable: false),
                    Location = table.Column<string>(nullable: true),
                    IsStarted = table.Column<bool>(nullable: false),
                    SecretaryId = table.Column<int>(nullable: false),
                    TeamAId = table.Column<int>(nullable: false),
                    TeamBId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Matches_Users_SecretaryId",
                        column: x => x.SecretaryId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matches_Teams_TeamAId",
                        column: x => x.TeamAId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matches_Teams_TeamBId",
                        column: x => x.TeamBId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MatchPoints",
                columns: table => new
                {
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<int>(nullable: false),
                    UpdatedBy = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PointNumber = table.Column<int>(nullable: false),
                    IsSetPoint = table.Column<bool>(nullable: false),
                    IsMatchPoint = table.Column<bool>(nullable: false),
                    MatchId = table.Column<int>(nullable: false),
                    MatchEntityId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchPoints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchPoints_Matches_MatchEntityId",
                        column: x => x.MatchEntityId,
                        principalTable: "Matches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlayerPoints",
                columns: table => new
                {
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<int>(nullable: false),
                    UpdatedBy = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PointType = table.Column<int>(nullable: false),
                    PointNumber = table.Column<int>(nullable: false),
                    IsSetPoint = table.Column<bool>(nullable: false),
                    IsMatchPoint = table.Column<bool>(nullable: false),
                    MatchPointId = table.Column<int>(nullable: false),
                    MatchPointEntityId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerPoints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlayerPoints_MatchPoints_MatchPointEntityId",
                        column: x => x.MatchPointEntityId,
                        principalTable: "MatchPoints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Matches_SecretaryId",
                table: "Matches",
                column: "SecretaryId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_TeamAId",
                table: "Matches",
                column: "TeamAId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_TeamBId",
                table: "Matches",
                column: "TeamBId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchPoints_MatchEntityId",
                table: "MatchPoints",
                column: "MatchEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerPoints_MatchPointEntityId",
                table: "PlayerPoints",
                column: "MatchPointEntityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayerPoints");

            migrationBuilder.DropTable(
                name: "MatchPoints");

            migrationBuilder.DropTable(
                name: "Matches");
        }
    }
}
