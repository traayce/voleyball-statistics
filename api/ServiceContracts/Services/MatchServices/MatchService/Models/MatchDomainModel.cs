using System;
using System.Collections.Generic;
using ServiceContracts.Services.MatchServices.MatchPlayerService.Models;
using ServiceContracts.Services.PlayerService.Models;
using ServiceContracts.Services.TeamService.Models;
using ServiceContracts.Services.UserService.Models;

namespace ServiceContracts.Services.MatchServices.MatchService.Models
{
    public interface IMatchDomainModel
    {
        int Id { get; set; }
        
        DateTime StartsAt { get; set; }
        
        string Location { get; set; }
        
        bool IsStarted { get; set; }
        
        IUserInfoDomainModel Secretary { get; set; }
        
        ITeamDomainModel TeamA { get; set; }
        
        ITeamDomainModel TeamB { get; set; }
        
        IEnumerable<IMatchPlayerDomainModel> MatchPlayers { get; set; }
    }
    
    public class MatchDomainModel : IMatchDomainModel
    {
        public int Id { get; set; }
        
        public DateTime StartsAt { get; set; }
        
        public string Location { get; set; }
        
        public bool IsStarted { get; set; }
        
        public IUserInfoDomainModel Secretary { get; set; }
        
        public ITeamDomainModel TeamA { get; set; }
        
        public ITeamDomainModel TeamB { get; set; }

        public IEnumerable<IMatchPlayerDomainModel> MatchPlayers { get; set; }
    }
}