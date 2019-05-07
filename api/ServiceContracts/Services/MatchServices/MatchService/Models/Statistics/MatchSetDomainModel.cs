using System.Collections.Generic;

namespace ServiceContracts.Services.MatchServices.MatchService.Models.Statistics
{
    public interface IMatchSetDomainModel
    {
        int SetNumber { get; set; }
        int APoints { get; set; }
        int BPoints { get; set; }

        IEnumerable<IMatchSetStepper> SetSteps { get; set; }
    }
    
    public class MatchSetDomainModel : IMatchSetDomainModel
    {
        public int SetNumber { get; set; }
        public int APoints { get; set; }
        public int BPoints { get; set; }
        public IEnumerable<IMatchSetStepper> SetSteps { get; set; }
    }
}