import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [
        StepperModule,
        ButtonModule,
        ReactiveFormsModule,
        RadioButtonModule,
        CommonModule,
    ],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
    addressForm: FormGroup;
    deliveryPaymentForm: FormGroup;
    totalPrice: number = 0;

    deliveryOptions = [
        {
            label: 'Standard (5-7 days) - €5.99',
            fee: 5.99,
            value: 'standard',
            icon: 'pi pi-clock',
        },
        {
            label: 'Express (2-3 days) - €9.99',
            fee: 9.99,
            value: 'express',
            icon: 'pi pi-send',
        },
        {
            label: 'Next Day (1 day) - €19.99',
            fee: 19.99,
            value: 'nextDay',
            icon: 'pi pi-calendar',
        },
    ];

    paymentOptions = [
        {
            label: 'Credit Card',
            value: 'creditCard',
            icon: 'pi pi-credit-card',
            fee: 0,
        },
        {
            label: 'PayPal',
            value: 'paypal',
            icon: 'pi pi-paypal',
            fee: 1.5, // Assuming PayPal fee
        },
        {
            label: 'Bank Transfer',
            value: 'bankTransfer',
            icon: 'pi pi-money-bill',
            fee: 0,
        },
    ];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private cartService: CartService
    ) {
        this.addressForm = this.fb.group({
            name: ['John Doe', Validators.required],
            street: ['123 Main St', Validators.required],
            city: ['Anytown', Validators.required],
            zip: ['12345', Validators.required],
            country: ['USA', Validators.required],
        });

        this.deliveryPaymentForm = this.fb.group({
            deliveryMethod: ['', Validators.required],
            paymentMethod: ['', Validators.required],
        });
    }

    ngOnInit(): void {}

    isAddressFormValid(): boolean {
        return this.addressForm.valid;
    }

    isDeliveryPaymentFormValid(): boolean {
        return this.deliveryPaymentForm.valid;
    }

    completeOrder(): void {
        if (this.isAddressFormValid() && this.isDeliveryPaymentFormValid()) {
            console.log('Order is valid, navigating to success page');
            this.cartService.clearCart(); // Clear the cart here
            this.router.navigate(['/success']);
        } else {
            console.log('Order is not valid');
        }
    }

    getDeliveryLabel(value: string): string {
        const option = this.deliveryOptions.find((opt) => opt.value === value);
        return option ? option.label : '';
    }

    getPaymentLabel(value: string): string {
        const option = this.paymentOptions.find((opt) => opt.value === value);
        return option ? option.label : '';
    }

    updateTotalPrice(): void {
        const selectedPayment = this.deliveryPaymentForm.value.paymentMethod;
        const selectedDelivery = this.deliveryPaymentForm.value.deliveryMethod;
        const selectedDeliveryOption = this.deliveryOptions.find(
            (opt) => opt.value === selectedDelivery
        );
        const selectedPaymentOption = this.paymentOptions.find(
            (opt) => opt.value === selectedPayment
        );
        let totalPrice = parseFloat(localStorage.getItem('totalPrice') || '0');

        // Round to the nearest 100th
        totalPrice = Math.round(totalPrice * 100) / 100;

        if (selectedPaymentOption && selectedDeliveryOption) {
            totalPrice =
                totalPrice +
                selectedPaymentOption.fee +
                selectedDeliveryOption.fee;
        }

        // Ensure the total price is rounded to two decimal places
        this.totalPrice = parseFloat(totalPrice.toFixed(2));
    }
}