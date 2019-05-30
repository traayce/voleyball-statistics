using System;

namespace ServiceContracts.Services.MatchServices.MatchService.Models
{
    public interface IMatchCreateDomainModel
    {
         int Id { get; set; }
        
         DateTime StartsAt { get; set; }
        
         string Location { get; set; }
        
         bool IsStarted { get; set; }
        
         int TeamAId { get; set; }
        
         int TeamBId { get; set; }
         
         bool IsFinished { get; set; }
    }
    
    public class MatchCreateDomainModel : IMatchCreateDomainModel
    {
        public int Id { get; set; }
        
        public DateTime StartsAt { get; set; }
        
        public string Location { get; set; }
        
        public bool IsStarted { get; set; }
        
        public bool IsFinished { get; set; }
        
        public int TeamAId { get; set; }
        
        public int TeamBId { get; set; }
    }
}