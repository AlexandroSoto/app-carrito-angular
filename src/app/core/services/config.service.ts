import { Injectable, signal, WritableSignal } from '@angular/core';
import { Config } from '../interfaces/configuracios';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() {
    fetch("data/configuracion.json").then(res =>{
      res.json().then(resJson=>{
        this.configuracion.set(resJson);
      })
    })
   }

  configuracion:WritableSignal<Config> = signal({
    costoEnvio: 2000,
    diasVencimientoCrrito: 100
  });

}
