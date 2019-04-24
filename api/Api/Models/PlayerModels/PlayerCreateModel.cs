using System.ComponentModel.DataAnnotations;
using ServiceContracts.Services.PlayerService.Models;

namespace Api.Models.PlayerModels
{
    public class PlayerCreateModel : IPlayerCreateDomainModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Number { get; set; }
        public int TeamId { get; set; }
    }
}