using System;
using System.ComponentModel.DataAnnotations;

namespace FlashSalesApp.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        public string? Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Quantity { get; set; }

        public DateTime? SaleDate { get; set; }

        public decimal? SalePrice { get; set; }
    }
}