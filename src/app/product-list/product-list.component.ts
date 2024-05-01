import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { CommonModule} from '@angular/common';
import { ProductItemComponent } from "../product-item/product-item.component";

@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [CommonModule, ProductItemComponent]
})
export class ProductListComponent {
  products!: Product[];

  constructor(private productService: ProductService) { 
    this.productService.getAllProductMetadata().subscribe((values) => {
      this.products = values;
    });
  }
}
