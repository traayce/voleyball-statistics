using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataEntities.Base;

namespace DataEntities.Entities
{
    public class PlayerEntity: Auditable, IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Number { get; set; }
        public int TeamEntityId { get; set; }
        public virtual TeamEntity TeamEntity { get; set; }
        
        [DefaultValue(true)]
        public bool IsValid { get; set; }
    }
}