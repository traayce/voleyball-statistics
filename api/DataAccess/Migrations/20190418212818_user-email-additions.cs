using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class useremailadditions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Name",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_Users_Name",
                table: "Users",
                column: "Name",
                unique: true);
        }
    }
}
