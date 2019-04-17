using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using ServiceContracts.Models.Product;

namespace Api.Models.Product
{
    public class ProductViewModel : IProductDomainModel
    {
        public int Id { get; set; }
        [StringLength(100), Required]
        public string Code { get; set; }
        [StringLength(100), Required]
        public string Name { get; set; }
        public byte[] Photo { get; set; }
        [Required]
        [Range(1, double.MaxValue, ErrorMessage = "Price must be 1-[MAX_DOUBLE]")]
        public double Price { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}