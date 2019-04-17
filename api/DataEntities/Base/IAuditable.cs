using System;

namespace DataEntities.Base
{
    public interface IAuditable
    {
        DateTime UpdatedAt { get; set; }
        DateTime CreatedAt { get; set; }
        int CreatedBy { get; set; }
        int UpdatedBy { get; set; }
    }
}