namespace ServiceContracts.Authentication.Models
{
    public class UserDomainModel
    {
        public string Name { get; set; }
        public string Token { get; set; }
    }
    
    public class AppSettings
    {
        public string Secret { get; set; }
    }
}