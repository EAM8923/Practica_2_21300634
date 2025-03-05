import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';


@Component({
  selector: 'app-carrito',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
  
})
export class CarritoComponent {
  carrito: any[]=[];
  recibo: string = '';

  constructor(private carritoService: CarritoService, private router:Router) {}
    
  ngOnInit(){
    this.carrito=this.carritoService.obtenerCarrito();
  }
  eliminarProducto(index: number) {
    this.carritoService.eliminarProducto(index);
    this.carrito = [...this.carritoService.obtenerCarrito()];
  }
  generarXML() {
    this.recibo = this.carritoService.generarXML();
  }
  calcularTotal() {
    return this.carrito.reduce((total, producto) => total + producto.precio, 0);
  }

  descargarXML() {
    const blob = new Blob([this.recibo], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recibo.xml';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  reciboData: { id: string, nombre: string, precio: number }[] = [];
  total: number = 0;

  generarRecibo() {
    const carrito = this.carritoService.obtenerCarrito();
    this.reciboData = carrito.map(producto => ({
      id: producto.id.toString(),
      nombre: producto.nombre,
      precio: producto.precio
    }));

    this.total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    this.generarXML();

  }
  irAlProducto(): void {
    this.router.navigate(['/producto']);
  }

}

