using System.Collections.Generic;

namespace ServiceContracts.Services.MatchServices.MatchService.Models.Statistics
{
    public interface IMatchSetStepper
    {
        int PointNumber { get; set; }
        bool IsTeamAPoint { get; set; }
         IEnumerable<string> Actions { get; set; }
    }

    public class MatchSetStepper : IMatchSetStepper
    {
        public int PointNumber { get; set; }
        public bool IsTeamAPoint { get; set; }
        public IEnumerable<string> Actions { get; set; }
    }
}