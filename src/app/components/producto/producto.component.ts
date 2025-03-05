import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {

  productos: Producto[]=[];

  constructor ( 
    private productoService: ProductoService,
    private carritoService:CarritoService,
    private router:Router
  ) {}  

  ngOnInit(): void{
    this.productos=this.productoService.obtenerProductos();
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
  
  }
  irAlcarrito(): void {
    this.router.navigate(['/carrito']);
  }
}
