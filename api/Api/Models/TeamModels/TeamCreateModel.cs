using System.ComponentModel.DataAnnotations;
using ServiceContracts.Services.TeamService.Models;

namespace Api.Models.TeamModels
{
    public class TeamCreateModel : ITeamCreateDomainModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string City { get; set; }
    }
}