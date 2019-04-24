using System.Collections.Generic;
using ServiceContracts.Services.PlayerService.Models;

namespace ServiceContracts.Services.TeamService.Models
{
    public interface ITeamCreateDomainModel
    {
         int Id { get; set; }
         string Name { get; set; }
         string City { get; set; }
    }
    
    public class TeamCreateDomainModel : ITeamCreateDomainModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
    }
}