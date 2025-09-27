import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/productos';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.scss',
  standalone: true,
  imports: [ContadorCantidadComponent, CommonModule, FormsModule]
})
export class ArticuloComponent implements OnInit{

  producto?: Producto;
  cantidad = signal(1);
  notas = "";

  ngOnInit(): void {
    this.headerService.titulo.set("Articulo");
  }

constructor(public headerService: HeaderService,
            private ac:ActivatedRoute,
            public productosService:ProductosService,
            public cartService:CartService,
            private router:Router
) {
  ac.params.subscribe(param =>{
    if(param['id']){
      this.productosService.getById(param['id']).then(producto => {
        this.producto = producto;
      })
    }
  });
}

agregarAlCarrito(){
  if(!this.producto) return;
  this.cartService.agregarProducto(this.producto?.id, this.cantidad(), this.notas);
  this.router.navigate(["/carrito"]);
}

}
