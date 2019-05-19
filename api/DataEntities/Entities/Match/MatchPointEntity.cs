using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataEntities.Base;

namespace DataEntities.Entities.Match
{
    public class MatchPointEntity : Auditable, IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        
        public int SetNumber { get; set; }
        
        public int PointNumber { get; set; }
        
        public bool IsSetPoint { get; set; }
        
        public bool IsMatchPoint { get; set; }
        
        [ForeignKey("MatchEntity")]
        public int MatchId { get; set; }
        
        public virtual MatchEntity Match { get; set; }
        
        [ForeignKey("TeamEntity")]
        public int TeamId { get; set; }
    }
}