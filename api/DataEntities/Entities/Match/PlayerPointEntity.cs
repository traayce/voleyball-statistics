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
        
        public int PointType { get; set; }
        
        public int MatchPointId { get; set; }
        public virtual MatchPointEntity MatchPointEntity{ get; set; }
        
        public int PlayerId { get; set; }
        public virtual PlayerEntity PlayerEntity { get; set; }
    }
}