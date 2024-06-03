import { Component, HostListener } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { DataViewModule } from 'primeng/dataview';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    imports: [
        CommonModule,
        ButtonModule,
        ProductItemComponent,
        ProductGridComponent,
        DataViewModule,
        FiltersComponent,
        FormsModule,
        InputGroupModule,
        InputTextModule,
    ],
})
export class ProductListComponent {
    customLayout: 'list' | 'grid' = 'list';
    products: Product[] = [];
    loading: boolean = false;
    loadingMore: boolean = false;
    noProducts: boolean = false; // Flag to indicate no products
    searchQuery: string = ''; // Add a property for the search query

    constructor(private productService: ProductService) {
        this.loadInitialProducts();
    }

    loadInitialProducts() {
        this.productService
            .getInitialProductMetadata(12)
            .subscribe((products) => {
                this.products = products;
                this.noProducts = products.length === 0;
            });
    }

    loadMoreProducts() {
        if (this.noProducts) return; // Prevent loading more if no products

        this.loadingMore = true;
        this.productService
            .getNextProductMetadata(6)
            .subscribe((newProducts) => {
                this.products = [...this.products, ...newProducts];
                this.loadingMore = false;
                this.noProducts = this.products.length === 0;
            });
    }

    onFiltersChanged(filters: any) {
        this.applyFiltersAndSearch(filters);
    }

    onSearch() {
        this.applyFiltersAndSearch();
    }

    applyFiltersAndSearch(filters?: any) {
        const selectedBrands = filters
            ? filters.selectedBrands.map((brand: any) => brand.value)
            : [];
        const selectedGenders = filters
            ? filters.selectedGenders.map((gender: any) => gender.value)
            : [];
        const selectedTypes = filters
            ? filters.selectedTypes.map((type: any) => type.value)
            : [];
        const selectedCategories = filters
            ? filters.selectedCategories.map((category: any) => category.value)
            : [];
        const selectedSizes = filters
            ? filters.selectedSizes.map((size: any) => size.value)
            : [];
        const selectedColors = filters
            ? filters.selectedColors.map((color: any) => color.value)
            : [];

        this.productService
            .getInitialProductMetadata(
                12,
                undefined,
                this.searchQuery,
                selectedBrands,
                selectedGenders,
                selectedTypes,
                selectedCategories,
                selectedColors,
                selectedSizes
            )
            .subscribe((products) => {
                this.products = products;
                this.noProducts = products.length === 0;
            });
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event: any) {
        const documentHeight = document.documentElement.scrollHeight;
        const viewportHeight =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
        const scrollPosition =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
        const scrollThreshold = 100;

        if (
            documentHeight - viewportHeight - scrollPosition <
                scrollThreshold &&
            !this.loadingMore &&
            !this.noProducts
        ) {
            this.loadMoreProducts();
        }
    }
}
