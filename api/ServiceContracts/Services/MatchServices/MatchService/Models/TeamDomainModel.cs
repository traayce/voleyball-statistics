using System;
using System.Collections.Generic;
using ServiceContracts.Services.PlayerService.Models;
using ServiceContracts.Services.TeamService.Models;

namespace ServiceContracts.Services.MatchServices.MatchService.Models
{
    public interface IMatchDomainModel
    {
        int Id { get; set; }
        
        DateTime StartsAt { get; set; }
        
        string Location { get; set; }
        
        bool IsStarted { get; set; }
        
        int SecretaryId { get; set; }
        
        TeamDomainModel TeamA { get; set; }
        
        TeamDomainModel TeamB { get; set; }
    }
    
    public class MatchDomainModel : IMatchDomainModel
    {
        public int Id { get; set; }
        
        public DateTime StartsAt { get; set; }
        
        public string Location { get; set; }
        
        public bool IsStarted { get; set; }
        
        public int SecretaryId { get; set; }
        
        public TeamDomainModel TeamA { get; set; }
        
        public TeamDomainModel TeamB { get; set; }
    }
}