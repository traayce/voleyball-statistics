namespace ServiceContracts.Services.PlayerService.Models
{
    public interface IPlayerDomainModel
    {
         int Id { get; set; }
         string Name { get; set; }
         int Number { get; set; }
         int TeamId { get; set; }
    }
    
    public class PlayerDomainModel : IPlayerDomainModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Number { get; set; }
        public int TeamId { get; set; }
    }
}