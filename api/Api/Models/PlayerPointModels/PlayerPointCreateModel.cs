using System.ComponentModel.DataAnnotations;
using ServiceContracts.Services.MatchServices.PlayerPointService.Models;

namespace Api.Models.PlayerPointModels
{
    public class PlayerPointCreateModel : IPlayerPointCreateDomainModel
    {
        public int Id { get; set; }

        [Required]
        public ClsfPlayerPointType PointType { get; set; }

        [Required]
        public int MatchPointId { get; set; }
        
        [Required]
        public int PlayerId { get; set; }
    }
}