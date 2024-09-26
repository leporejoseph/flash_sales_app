import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  outOfStockWarning: string | null = null;
  cartMessage: string | null = null;
  editingProduct: Product | null = null;
  private productUpdateSubscription: Subscription = new Subscription();
  private cartMessageSubscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.subscribeToProductUpdates();
    this.subscribeToCartMessages();
  }

  ngOnDestroy(): void {
    this.productUpdateSubscription.unsubscribe();
    this.cartMessageSubscription.unsubscribe();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  subscribeToProductUpdates() {
    this.productUpdateSubscription.add(
      this.cartService.getProductUpdates().subscribe(
        (updatedProduct: Product | null) => {
          if (updatedProduct) {
            const productIndex = this.products.findIndex(p => p.id === updatedProduct.id);
            if (productIndex !== -1) {
              this.products[productIndex].quantity = updatedProduct.quantity;
            }
          }
        }
      )
    );
  }

  subscribeToCartMessages() {
    this.cartMessageSubscription = this.cartService.getCartMessages().subscribe(
      (message: string) => {
        this.cartMessage = message;
      }
    );
  }

  addToCart(product: Product) {
    this.cartMessage = null;
    if (product.quantity > 0) {
      this.cartService.addToCart(product);
      this.outOfStockWarning = null;
    } else {
      this.outOfStockWarning = 'This item is out of stock.';
    }
  }

  deleteProduct(product: Product) {
    this.products = this.products.filter(p => p !== product);
    this.productService.deleteProduct(product.id).subscribe();
  }

  editProduct(product: Product) {
    this.editingProduct = product;
  }

  updateProduct(product: Product, field: keyof Product, value: string | number | Date) {
    if (field in product) {
      (product as any)[field] = value;
      this.productService.updateProduct(product).subscribe();
    }
  }

  onProductAdded() {
    this.loadProducts(); // Reload products when a new product is added
  }
}
