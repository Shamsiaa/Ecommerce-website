import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Badge, BadgeModule } from 'primeng/badge';
import { CartItem } from '../services/cart-item';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-menubar',
    standalone: true,
    imports: [CommonModule, ButtonModule, RouterModule, BadgeModule],
    templateUrl: './menubar.component.html',
    styleUrl: './menubar.component.css',
})
export class MenubarComponent implements OnInit {
    totalCartItems: any = '';

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
        this.updateTotalCartItems();
    }

    updateTotalCartItems() {
        this.totalCartItems = this.cartService.getTotalCartItems();
    }
}

