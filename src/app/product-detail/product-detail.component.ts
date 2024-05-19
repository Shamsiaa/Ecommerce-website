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
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductMetadata(productId).subscribe(product => {
          this.product = product;
          console.log(product)
        }, error => {
          console.error(error);
        });
      }
    });
  }
}
