import { Injectable } from "@angular/core";
import { Producto } from "../models/producto";

@Injectable({
    providedIn:'root'
})

export class CarritoService{
    eliminarProducto(index: number) {
        if (index >= 0 && index < this.carrito.length) {
            this.carrito.splice(index, 1);
        }
    }
    private carrito:Producto[]=[];
    agregarProducto(producto:Producto){
        this.carrito.push(producto)
    }

    obtenerCarrito(): Producto[] {
        return this.carrito.map(producto => ({
          ...producto,
          precio: parseFloat((producto.precio * 1.16).toFixed(2))
        }));
    }
    generarXML(): string {
        const emisorNombre = "Productos";
        const emisorRFC = "372";
        const emisorDireccion = "Dirección cliente";
        const receptorNombre = "Cliente";
        const fechaActual = new Date().toISOString().split('T')[0];
        const noFactura = "001";
    
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<Factura>\n`;

        xml += `  <Encabezado>\n`;
        xml += `    <Emisor>\n`;
        xml += `      <Nombre>${emisorNombre}</Nombre>\n`;
        xml += `      <RFC>${emisorRFC}</RFC>\n`;
        xml += `      <Direccion>${emisorDireccion}</Direccion>\n`;
        xml += `    </Emisor>\n`;
        xml += `    <Receptor>\n`;
        xml += `      <Nombre>${receptorNombre}</Nombre>\n`;
        xml += `    </Receptor>\n`;
        xml += `    <Fecha>${fechaActual}</Fecha>\n`;
        xml += `    <NoFactura>${noFactura}</NoFactura>\n`;
        xml += `  </Encabezado>\n`;

        xml += `  <Detalles>\n`;
    
        let subtotal = 0;
        this.carrito.forEach((producto) => {
            const precioUnitario = producto.precio;
            const subtotalProducto = precioUnitario;
            subtotal += subtotalProducto;
    
            xml += `    <Item>\n`;
            xml += `      <Descripcion>${producto.nombre}</Descripcion>\n`;
            xml += `      <Cantidad>1</Cantidad>\n`;
            xml += `      <PrecioUnitario>${precioUnitario.toFixed(2)}</PrecioUnitario>\n`;
            xml += `      <Subtotal>${subtotalProducto.toFixed(2)}</Subtotal>\n`;
            xml += `    </Item>\n`;
        });
    
        xml += `  </Detalles>\n`;

        const iva = subtotal * 0.16;
        const total = subtotal + iva;
    
        xml += `  <Totales>\n`;
        xml += `    <Subtotal>${subtotal.toFixed(2)}</Subtotal>\n`;
        xml += `    <IVA>${iva.toFixed(2)}</IVA>\n`;
        xml += `    <Total>${total.toFixed(2)}</Total>\n`;
        xml += `  </Totales>\n`;
    
        xml += `</Factura>`;
    
        return xml;
    }
      
}