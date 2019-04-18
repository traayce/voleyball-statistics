using System.ComponentModel.DataAnnotations;

namespace Api.Models.AuthenticationModels
{
    public class UserLoginModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
    }
}