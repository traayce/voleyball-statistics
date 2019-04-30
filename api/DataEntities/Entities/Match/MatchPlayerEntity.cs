using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataEntities.Base;

namespace DataEntities.Entities.Match
{
    public class MatchPlayerEntity : Auditable, IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        public bool IsOnCourt { get; set; }

        public int PlayerId { get; set; }

        public virtual PlayerEntity PlayerEntity { get; set; }

        public int MatchId { get; set; }

        public virtual MatchEntity MatchEntity { get; set; }
        
        public int TeamId { get; set; }
        
        public virtual TeamEntity TeamEntity { get; set; }
    }
}