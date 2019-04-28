using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataEntities.Entities.Match
{
    public class MatchPlayerEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        public bool IsOnCourt { get; set; }
        
        public bool PlayerId { get; set; }
        
        public virtual PlayerEntity PlayerEntity { get; set; }
        
        public int MatchId { get; set; }
        
        public virtual MatchEntity MatchEntity { get; set; }
    }
}