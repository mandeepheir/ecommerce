import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  products: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  // Model for the new product form
  newProduct = {
    name: '',
    description: '',
    price: null,
    category: '',
    imageUrl: ''
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        this.products = Array.isArray(response) ? response : (response.products || response.data || []);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.errorMessage = 'Failed to load products from server.';
      }
    });
  }

  onSubmit() {
    this.productService.addProduct(this.newProduct).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        this.successMessage = 'Product added successfully!';
        this.errorMessage = '';
        
        // Reset form fields
        this.newProduct = { name: '', description: '', price: null, category: '', imageUrl: '' };
        
        // Reload products list
        this.loadProducts();

        // Clear success message after 3 seconds
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        console.error('Error adding product:', err);
        this.errorMessage = 'Failed to add product. Please check all fields.';
      }
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          console.log('Product deleted:', response);
          this.successMessage = 'Product deleted successfully!';
          this.loadProducts(); // Refresh list
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          this.errorMessage = 'Failed to delete product.';
        }
      });
    }
  }
}