using System.Collections.Generic;

namespace ServiceContracts.Services.MatchServices.MatchService.Models.Statistics
{
    public interface IMatchSetStepper
    {
        string SetScore { get; set; }
        string TeamAction { get; set; }
        IEnumerable<string> PlayerActions { get; set; }
    }

    public class MatchSetStepper : IMatchSetStepper
    {
        public string SetScore { get; set; }
        public string TeamAction { get; set; }
        public IEnumerable<string> PlayerActions { get; set; }
    }
}