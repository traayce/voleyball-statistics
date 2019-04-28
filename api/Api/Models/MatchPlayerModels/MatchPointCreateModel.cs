using System.ComponentModel.DataAnnotations;
using ServiceContracts.Services.MatchServices.MatchPlayerService.Models;

namespace Api.Models.MatchPlayerModels
{
    public class MatchPlayerCreateModel : IMatchPlayerCreateDomainModel
    {
        public int Id { get; set; }

        public bool IsOnCourt { get; set; }

        [Required]
        public int PlayerId { get; set; }

        [Required]
        public int MatchId { get; set; }
    }
}