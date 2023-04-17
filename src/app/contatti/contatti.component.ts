import { Component } from '@angular/core';
import { Contatto } from '../interfaces';

@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.css']
})
export class ContattiComponent {

  model:Contatto = {
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    messaggio: "",
    condizioni: false
  }

  pattern:any = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  telefonoInvalido:boolean = false;

  constructor() {}

  invia():void {
    console.log("dati inviati")
  }

  checkPhone(event:any, value:string): void {
    if(!this.pattern.test(Number(value))) {
      event.target.classList.add("error");
      this.telefonoInvalido = true;
    }
    else {
      event.target.classList.remove("error");
      this.telefonoInvalido = false;
    }
  }

}
