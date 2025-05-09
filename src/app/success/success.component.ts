import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button'; 
@Component({
    selector: 'app-success',
    standalone: true,
    imports: [ButtonModule],
    templateUrl: './success.component.html',
    styleUrl: './success.component.css',
})
export class SuccessComponent {
    constructor(private router: Router) {}

    goToHome(): void {
        this.router.navigate(['/']);
    }
}