import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-detail',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
    product!: Product;
    selectedColor: any;
    imageError = false;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const productId = params.get('id');
            if (productId) {
                this.productService.getProductMetadata(productId).subscribe(
                    (product) => {
                        this.product = product;
                        this.route.queryParams.subscribe((queryParams) => {
                            const colorId = queryParams['color'];
                            if (colorId) {
                                this.selectedColor = this.product.colors.find(
                                    (color) => color.color_id === colorId
                                );
                            } else {
                                this.selectedColor =
                                    this.product.colors.length > 0
                                        ? this.product.colors[0]
                                        : null;
                            }
                        });
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            }
        });
    }

    onColorChange(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        const colorId = selectElement.value;
        this.selectedColor = this.product.colors.find(
            (color) => color.color_id === colorId
        );
        this.imageError = false; // Reset the error state when color changes
    }

    getProductImage(): string {
        if (this.imageError) {
            return `./assets/products/images/${this.product.id}.jpg`; // Fallback image if error occurs
        }
        if (this.selectedColor) {
            return `./assets/products/images/${this.selectedColor.color_id}.jpg`;
        }
        return `./assets/products/images/${this.product.id}.jpg`;
    }

    onImageError(): void {
        this.imageError = true;
    }
}
