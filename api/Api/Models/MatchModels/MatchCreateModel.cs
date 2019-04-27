using System;
using System.ComponentModel.DataAnnotations;
using ServiceContracts.Services.MatchServices.MatchService.Models;
using ServiceContracts.Services.UserService.Models;

namespace Api.Models.MatchModels
{
    public class MatchCreateModel : IMatchCreateDomainModel
    {
        public int Id { get; set; }
        
        [Required]
        public DateTime StartsAt { get; set; }
        
        [Required]
        public string Location { get; set; }
        
        public bool IsStarted { get; set; }
        
        public int SecretaryId { get; set; }
        
        [Required]
        public int TeamAId { get; set; }
        [Required]
        public int TeamBId { get; set; }
    }
}