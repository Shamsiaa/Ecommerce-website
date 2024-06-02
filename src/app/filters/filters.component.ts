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
  
  selectedBrands: any[] = [];
  selectedGenders: any[] = [];
  selectedTypes: any[] = [];

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
  }

  onFilterChange() {
    this.filtersChanged.emit({
        selectedBrands: this.selectedBrands,
        selectedGenders: this.selectedGenders,
        selectedTypes: this.selectedTypes
    });
}

}
