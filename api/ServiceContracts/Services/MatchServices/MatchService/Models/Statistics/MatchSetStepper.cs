using System.Collections.Generic;

namespace ServiceContracts.Services.MatchServices.MatchService.Models.Statistics
{
    public interface IMatchSetStepper
    {
        int PointNumber { get; set; }
        string TeamAction { get; set; }
        IEnumerable<string> PlayerActions { get; set; }
    }

    public class MatchSetStepper : IMatchSetStepper
    {
        public int PointNumber { get; set; }
        public string TeamAction { get; set; }
        public IEnumerable<string> PlayerActions { get; set; }
    }
}