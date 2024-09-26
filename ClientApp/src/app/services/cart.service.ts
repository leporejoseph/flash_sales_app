import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  private productUpdateSubject = new BehaviorSubject<Product | null>(null);
  private cartMessageSubject = new BehaviorSubject<string>('');

  constructor(private productService: ProductService) {}

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  getProductUpdates() {
    return this.productUpdateSubject.asObservable();
  }

  getCartMessages() {
    return this.cartMessageSubject.asObservable();
  }

  addToCart(product: Product) {
    if (product.quantity > 0) {
      const existingProduct = this.cartItems.find(item => item.id === product.id);
      if (existingProduct) {
        this.cartMessageSubject.next("Only one of the same product may be allowed in the cart");
      } else {
        product.quantity--; // Decrement quantity in the original product list
        this.cartItems.push({ ...product }); // Push a copy of the product
        this.cartItemsSubject.next(this.cartItems);
        this.productUpdateSubject.next(product); // Emit the updated product
      }
    }
  }

  removeFromCart(product: Product) {
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if (index > -1) {
      const removedProduct = this.cartItems[index];
      removedProduct.quantity++; // Increment the quantity of the removed product
      this.cartItems.splice(index, 1); // Remove the item from the cart
      
      // Notify product updates with the single updated product
      this.productUpdateSubject.next(removedProduct);

      this.cartItemsSubject.next(this.cartItems);
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  updatePricesBasedOnDate(selectedDate: string, originalProducts: Product[]) {
    const selectedDateObj = new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1));

    this.cartItems.forEach(item => {
      const saleDateObj = new Date(item.saleDate);
      // Find the original product to get the correct price
      const originalProduct = originalProducts.find(p => p.id === item.id);
      let displayPrice = originalProduct ? originalProduct.price : item.price; // Use original price

      // Compare the dates
      console.log(saleDateObj.toDateString());
      console.log(selectedDateObj.toDateString());

      if (saleDateObj.toDateString() === selectedDateObj.toDateString()) {
        displayPrice = item.salePrice; // Use sale price if dates match
      }

      // Update the item's price for display purposes
      item.price = displayPrice; // This will only affect the cart items
    });
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
  }
}
