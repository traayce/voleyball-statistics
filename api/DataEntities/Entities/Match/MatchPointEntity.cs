using System.Collections.Generic;
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
        
        public int PointNumber { get; set; }
        
        public bool IsSetPoint { get; set; }
        
        public bool IsMatchPoint { get; set; }
        
        public int MatchId { get; set; }
        public MatchEntity MatchEntity{ get; set; }
        
        public virtual ICollection<PlayerPointEntity> Players { get; set; }
    }
}