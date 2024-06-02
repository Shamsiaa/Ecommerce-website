//import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { DataViewModule } from 'primeng/dataview';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [
        CommonModule,
        ButtonModule,
        ProductItemComponent,
        ProductGridComponent,
        DataViewModule,
        FiltersComponent
    ],
})
export class ProductListComponent {
    customLayout: 'list' | 'grid' = 'list';
    products: Product[] = [];
    loading: boolean = false;
    loadingMore: boolean = false; // property to track loading during scroll

    constructor(private productService: ProductService) {
        this.loadInitialProducts();
    }

    loadInitialProducts() {
        this.productService
            .getInitialProductMetadata(12)
            .subscribe((products) => {
                this.products = products;
            });
    }

    loadMoreProducts() {
        this.loadingMore = true; // Set loadingMore to true when loading more items
        this.productService
            .getNextProductMetadata(6)
            .subscribe((newProducts) => {
                this.products = [...this.products, ...newProducts];
                this.loadingMore = false; // Set loadingMore back to false when loading is complete
            });
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event: any) {
        // Height of the document
        const documentHeight = document.documentElement.scrollHeight;

        // Height of the viewport
        const viewportHeight =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;

        // Current scroll position
        const scrollPosition =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        // Threshold to trigger loading more data
        const scrollThreshold = 100; 

        // Check if the user has scrolled to the bottom of the page or reached the threshold
        if (
            documentHeight - viewportHeight - scrollPosition <
                scrollThreshold &&
            !this.loadingMore
        ) {
            this.loadMoreProducts();
        }
    }
    onFiltersChanged(filtersData: FiltersComponent) {
        this.productService.getInitialProductMetadata(12, undefined, undefined, filtersData.selectedBrands, filtersData.selectedGenders, filtersData.selectedTypes).subscribe((products) => {
            this.products = products;
        });
    }
}
