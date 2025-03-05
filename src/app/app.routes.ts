import { Routes } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';

export const routes: Routes = [
    { path: 'producto', component: ProductoComponent},
    { path: 'carrito', component: CarritoComponent},
    { path: '', redirectTo: '/producto', pathMatch: 'full' }
];
