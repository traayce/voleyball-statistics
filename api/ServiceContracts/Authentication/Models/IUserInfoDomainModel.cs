namespace ServiceContracts.Authentication.Models
{
    public interface IUserInfoDomainModel
    {
        string Name { get; set; }
        string Email { get; set; }
        string Role { get; set; }
    }
}