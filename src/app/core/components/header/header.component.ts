import { Component, effect, signal } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

constructor(public headerService: HeaderService) {}
claseAplicada = signal("");
tituloMostrado = signal("");

esconderTitulo = effect(()=>{
  if(this.headerService.titulo()){
    this.claseAplicada.set("fade-out");
  }
},{allowSignalWrites:true});

mostrarTituloNuevo(e:AnimationEvent){
  if(e.animationName.includes("fade-out")){
    this.tituloMostrado.set(this.headerService.titulo());
    this.claseAplicada.set("fade-in");
    setTimeout(()=> this.claseAplicada.set(""),250);
  }
}

}
