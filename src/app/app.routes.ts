import { Routes } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { InventarioComponent } from './components/inventario/inventario.component.spec';

export const routes: Routes = [
    { path: 'producto', component: ProductoComponent},
    { path: 'carrito', component: CarritoComponent},
    { path: 'inventario', component: InventarioComponent},
    { path: '', redirectTo: '/producto', pathMatch: 'full' }
];
