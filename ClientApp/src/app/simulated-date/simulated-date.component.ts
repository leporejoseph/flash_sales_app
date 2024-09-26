import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-simulated-date',
  templateUrl: './simulated-date.component.html',
  styleUrls: ['./simulated-date.component.css']
})
export class SimulatedDateComponent {
  selectedDate: Date = new Date();
  originalProducts: Product[] = [];

  constructor(private cartService: CartService, private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.originalProducts = data; // Store original products
    });
  }

  onDateBlur(event: any) {
    const date = new Date(event.target.value);
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    this.selectedDate = date;
    this.cartService.updatePricesBasedOnDate(formattedDate, this.originalProducts); // Pass original products
  }
}