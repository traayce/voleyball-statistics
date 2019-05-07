namespace ServiceContracts.Services.MatchServices.MatchService.Models.Statistics
{
    public interface IMatchPlayerStatisticDomainModel
    {
        string PlayerName { get; set; }
        int Number { get; set; }
        int Points { get; set; }
        int Blocks { get; set; }
        int Assists { get; set; }
        int Turnovers { get; set; }
        int Aces { get; set; }
        int CardYellows { get; set; }
        int CardReds { get; set; }
        bool WasOnCourt { get; set; }
    }
    
    public class MatchPlayerStatisticDomainModel : IMatchPlayerStatisticDomainModel
    {
        public string PlayerName { get; set; }
        public int Number { get; set; }
        public int Points { get; set; }
        public int Blocks { get; set; }
        public int Assists { get; set; }
        public int Turnovers { get; set; }
        public int Aces { get; set; }
        public int CardYellows { get; set; }
        public int CardReds { get; set; }
        public bool WasOnCourt { get; set; }
    }
}