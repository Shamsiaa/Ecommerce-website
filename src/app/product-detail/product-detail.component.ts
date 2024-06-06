import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ButtonModule } from 'primeng/button';
import { Product } from '../services/product';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cart-item';

@Component({
    selector: 'app-product-detail',
    imports: [CommonModule, ImageModule, ButtonModule],
    standalone: true,
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
    id!: string;
    product!: Product;
    selectedColor: any;
    selectedSize: string = '';
    imageError = false;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const productId = params.get('id');
            if (productId) {
                this.productService.getProductMetadata(productId).subscribe(
                    (product) => {
                        this.product = product;
                        console.log('Product:', this.product);
                        this.route.queryParams.subscribe((queryParams) => {
                            const colorId = queryParams['color'];
                            if (colorId) {
                                this.selectedColor = this.product.colors.find(
                                    (color) => color.color_id === colorId
                                );
                            } else {
                                this.selectedColor = this.product.colors.length > 0 ? this.product.colors[0] : null;
                            }
                        });
                        if (this.product.sizes && this.product.sizes.length > 0) {
                            this.selectedSize = this.product.sizes[0];
                            console.log('Default Size:', this.selectedSize);
                        }
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            }
        });
    }

    addToCart(): void {
        console.log('Selected Size:', this.selectedSize);

        if (!this.selectedColor || !this.selectedSize) {
            alert('Please select a valid size and color.');
            return;
        }

        const cartItem: CartItem = {
            id: this.product.id,
            color: this.selectedColor,
            size: this.selectedSize,
            quantity: 1
        };
        console.log("cartItem", cartItem)

        this.cartService.addCartItem(cartItem);
        alert('Product added to cart.');
    }

    onColorChange(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        const colorId = selectElement.value;
        this.selectedColor = this.product.colors.find(
            (color) => color.color_id === colorId
        );
        this.imageError = false; // Reset the error state when color changes
        console.log('Color changed to:', this.selectedColor);
    }

    onSizeChange(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        const size = selectElement.value;
        this.selectedSize = size;
        console.log('Size changed to:', this.selectedSize);
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
