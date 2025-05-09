import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent,
    },

    {
        path: '',
        component: ProductListComponent,
    },
    { path: 'cart', component: CartComponent },
    {
        path: '**',
        redirectTo: '',
    },
];
