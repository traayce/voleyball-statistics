using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataEntities.Base;

namespace DataEntities.Entities.Match
{
    public class MatchEntity : Auditable, IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        
        public DateTime StartsAt { get; set; }
        
        public string Location { get; set; }
        
        public bool IsStarted { get; set; }
        
        [ForeignKey("SecretaryEntity")]
        public int SecretaryId { get; set; }
        public UserEntity SecretaryEntity { get; set; } 
        
        [ForeignKey("TeamAEntity")]
        public int TeamAId { get; set; }

        public TeamEntity TeamAEntity { get; set; } 
        
        [ForeignKey("TeamBEntity")]
        public int TeamBId { get; set; }
        public TeamEntity TeamBEntity { get; set; }
    }
}