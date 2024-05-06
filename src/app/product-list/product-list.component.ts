import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
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
      ProductItemComponent,
      ProductGridComponent,
      DataViewModule,
    ]
})
export class ProductListComponent {
  customLayout: 'list' | 'grid' = 'list'; // Ensure the type matches allowed values
  products!: Product[];

  constructor(private productService: ProductService) { 
    this.productService.getAllProductMetadata().subscribe((values) => {
      this.products = values;
    });
  }
}
