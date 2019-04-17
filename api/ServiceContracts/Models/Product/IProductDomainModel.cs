using System;

namespace ServiceContracts.Models.Product
{
    public interface IProductDomainModel
    {
        int Id { get; set; }
        string Code { get; set; }
        string Name { get; set; }
        byte[] Photo { get; set; }
        double Price { get; set; }
        DateTime UpdatedAt { get; set; }
    }
}