using System;
using System.ComponentModel.DataAnnotations;

namespace FlashSalesApp.Models
{
    public class Sale
    {
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }

        public required Product Product { get; set; }

        [Required]
        public DateTime SaleDate { get; set; }

        [Required]
        public decimal SalePrice { get; set; }
    }
}