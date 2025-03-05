import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private productos: Producto[] = [
    new Producto(1, 'Laptop', 1200, 'assets/image2.jpg'), 
    new Producto(2, 'Celular', 800, 'assets/image1.jpg'), 
    new Producto(3, 'Tablet', 600, 'assets/images3.jpg'),
  ];
  obtenerProductos(): Producto[]{
    return this.productos;
  }
}