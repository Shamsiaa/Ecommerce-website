import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { ActivatedRoute } from '@angular/router'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit {
  id!: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }
  @Input() product!: Product;
}
