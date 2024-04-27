import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule} from '@angular/common';

interface Country {
  name: string;
  code: string;
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DropdownModule, CalendarModule, ButtonModule, InputTextModule, RadioButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    salutation: new FormControl('', [
      Validators.required,
   ]),
    firstName: new FormControl('', [
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    birthdate: new FormControl('', [
      Validators.required,
    ]),
    street: new FormControl('', [
      Validators.required,
    ]),
    houseNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d+/)
    ]),
    postalCode: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(/\d+/)
    ])),
    city: new FormControl('', [
      Validators.required,
    ]),
    country: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
    ]),
});

isCountryInvalid() {
  const countryControl = this.registerForm.get('country');
  return countryControl ? countryControl.touched && !this.selectedCountry : false;
}



onSubmit() {
  if (this.registerForm.valid) {
      console.log('Form Submitted!');
  }
  else {
      console.log('Form not Submitted!');
  }
}

date: any;
selectedCountry: any;
countries: Country[] = [
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'UK' },
];


get firstName() {
  return this.registerForm.get('firstName');
}

get lastName() {
  return this.registerForm.get('lastName');
}

get email() {
  return this.registerForm.get('email');
}

get password() {
  return this.registerForm.get('password');
}

get birthdate() {
  return this.registerForm.get('birthdate');
}

get street() {
  return this.registerForm.get('street');
}

get houseNumber() {
  return this.registerForm.get('houseNumber');
}

get postalCode() {
  return this.registerForm.get('postalCode');
}

get city() {
  return this.registerForm.get('city');
}

get country() {
  return this.registerForm.get('country');
}


}
