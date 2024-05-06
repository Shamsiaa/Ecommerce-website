import { Component, Input } from '@angular/core';
import { Product } from '../services/product'; // Assuming you have a Product interface

@Component({
    selector: 'app-product-grid',
    templateUrl: './product-grid.component.html',
    imports: [],
    standalone: true,
    styleUrls: ['./product-grid.component.css'],
})
export class ProductGridComponent {
    @Input() product!: Product;
}
