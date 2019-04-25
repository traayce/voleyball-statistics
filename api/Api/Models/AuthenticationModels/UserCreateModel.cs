using System.ComponentModel.DataAnnotations;
using ServiceContracts.Services.UserService.Models;

namespace Api.Models.AuthenticationModels
{
    public class UserCreateModel : IUserCreateDomainModel
    {
        [StringLength(50)]
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Password { get; set; }
        
        [Required(ErrorMessage = "El.Pašto adresas yra privalomas")]
        [EmailAddress(ErrorMessage = "Neteisingas El.Pašto formatas")]
        public string Email { get; set; }
    }
}