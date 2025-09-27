import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CategoriasService } from '../../core/services/categorias.service';
import { Categoria } from '../../core/interfaces/categorias';
import { TarjetaCategoriaComponent } from '../../core/components/tarjeta-categoria/tarjeta-categoria.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone:true,
  imports: [TarjetaCategoriaComponent, CommonModule, RouterModule]
})
export class HomeComponent implements OnInit, OnDestroy{
  constructor(public headerService: HeaderService,
              public categoriasService: CategoriasService
  ) {}

  categorias:WritableSignal<Categoria[]> = signal([]);

  ngOnInit(): void {
    this.headerService.titulo.set("Home");
    this.headerService.extendido.set(true);
    this.categoriasService.getAll().then(res => this.categorias.set(res));
  }


  ngOnDestroy(): void {
    this.headerService.extendido.set(false);
  }
}
