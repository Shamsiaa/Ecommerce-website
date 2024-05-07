import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { ButtonModule } from 'primeng/button';
import { CommonModule} from '@angular/common';
import { ProductItemComponent } from "../product-item/product-item.component";
import { DataViewModule } from 'primeng/dataview';
import { ProductGridComponent } from '../product-grid/product-grid.component';

@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [CommonModule, 
      ButtonModule,
      ProductItemComponent,
      ProductGridComponent,
      DataViewModule,
    ]
})
export class ProductListComponent {
  customLayout: 'list' | 'grid' = 'list'; // Ensure the type matches allowed values
  products!: Product[];
  loading: boolean = false;

  constructor(private productService: ProductService) {
    this.loadInitialProducts();
  }

  loadInitialProducts() {
    this.productService.getInitialProductMetadata(12).subscribe((products) => {
      this.products = products;
    });
  }

  loadMoreProducts() {
    this.loading = true;
    this.productService.getNextProductMetadata(6).subscribe(newProducts => {
      this.products = [...this.products, ...newProducts];
      this.loading = false;
    });
  }
}