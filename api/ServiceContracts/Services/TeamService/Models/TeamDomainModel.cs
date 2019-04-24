using System.Collections.Generic;
using ServiceContracts.Services.PlayerService.Models;

namespace ServiceContracts.Services.TeamService.Models
{
    public interface ITeamDomainModel
    {
         int Id { get; set; }
         string Name { get; set; }
         string City { get; set; }
         IEnumerable<IPlayerDomainModel> Players { get; set; }
    }
    
    public class TeamDomainModel : ITeamDomainModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public IEnumerable<IPlayerDomainModel> Players { get; set; }
    }
}