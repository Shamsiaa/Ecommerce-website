import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule} from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, FloatLabelModule, ButtonModule, InputTextModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm = new FormGroup({
        email: new FormControl('', [
          Validators.required,
          Validators.email,
    ]),
    password: new FormControl('', [
        Validators.required,
    ]),
    });

    onSubmit() {
        if (this.loginForm.valid) {
            console.log('Form Submitted!');
        }
        else {
            console.log('Form not Submitted!');
        }
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }
}
