import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MultiSelectModule, CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  brands: any[] = [];
  genders: any[] = [];
  types: any[] = [];
  categories: any[] = [];
  prices: any[] = [];
  sizes: any[] = [];
  colors: any[] = [];
  
  selectedBrands: any[] = [];
  selectedGenders: any[] = [];
  selectedTypes: any[] = [];
  selectedCategories: any[] = [];
  selectedPrices: any[] = [];
  selectedSizes: any[] = [];
  selectedColors: any[] = [];

  @Output() filtersChanged = new EventEmitter<any>();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getBrandList().subscribe(brands => {
      this.brands = brands.map(brand => ({ label: brand, value: brand }));
    });

    this.productService.getGenderList().subscribe(genders => {
      this.genders = genders.map(gender => ({ label: gender, value: gender }));
    });

    this.productService.getTypeList().subscribe(types => {
      this.types = types.map(type => ({ label: type, value: type }));
    });

    this.productService.getCategoryList().subscribe(categories => {
      this.categories = categories.map(category => ({ label: category, value: category }));
    });

    this.productService.getPriceList().subscribe(prices => {
      this.prices = prices.map(price => ({ label: price, value: price }));
    });

    this.productService.getSizesList().subscribe(sizes => {
      this.sizes = sizes.map(size => ({ label: size, value: size }));
    });

    this.productService.getColorsList().subscribe(colors => {
      this.colors = colors.map(color => ({ label: color.color_name, value: color.color_name }));
    });
  }

  onFilterChange() {
    this.filtersChanged.emit({
      selectedBrands: this.selectedBrands,
      selectedGenders: this.selectedGenders,
      selectedTypes: this.selectedTypes,
      selectedCategories: this.selectedCategories,
      selectedPrices: this.selectedPrices,
      selectedSizes: this.selectedSizes,
      selectedColors: this.selectedColors
    });
  }
}
