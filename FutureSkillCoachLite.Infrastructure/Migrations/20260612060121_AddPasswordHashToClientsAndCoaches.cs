using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FutureSkillCoachLite.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPasswordHashToClientsAndCoaches : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Coaches",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "$2a$11$8FI3dLWRnlGlkhHVxPgeTeyPvMJpqUMWPX1FsP.fNmFCYa6v7ri/y");

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Clients",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "$2a$11$8FI3dLWRnlGlkhHVxPgeTeyPvMJpqUMWPX1FsP.fNmFCYa6v7ri/y");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Coaches");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Clients");
        }
    }
}
