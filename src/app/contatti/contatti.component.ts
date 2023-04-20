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

  constructor() {}

  invia():void {
    console.log("dati inviati")
  }

}
