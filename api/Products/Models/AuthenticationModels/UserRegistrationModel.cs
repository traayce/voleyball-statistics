using System.ComponentModel.DataAnnotations;
using ServiceContracts.Authentication.Models;

namespace Api.Models.AuthenticationModels
{
    public class UserRegistrationModel : IUserRegistrationDomainModel
    {
        [StringLength(50)]
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Password { get; set; }
        
        [Required(ErrorMessage = "The email address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }
    }
}