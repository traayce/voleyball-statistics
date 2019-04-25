using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataEntities.Base;

namespace DataEntities.Entities.Match
{
    public class PlayerPointEntity: Auditable, IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        
        public ClsfPointType PointType { get; set; }
        
        public int PointNumber { get; set; }
        
        public bool IsSetPoint { get; set; }
        
        public bool IsMatchPoint { get; set; }
        
        public int MatchPointId { get; set; }
        public MatchPointEntity MatchPointEntity{ get; set; }
    }

    public enum ClsfPointType
    {
        Point = 1,
        Block = 2,
        Assist = 3,
        Turnover = 4,
        Ace = 5,
        CardYellow = 6,
        CardRed = 7
    }
}