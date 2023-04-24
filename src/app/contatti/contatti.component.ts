import { Component } from '@angular/core';
import { Contatto } from '../interfaces';

@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.css']
})
export class ContattiComponent {

  // --- modello da inviare, bindato con campi input html ---
  model:Contatto = {
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    messaggio: "",
    condizioni: false
  }

  // --- se true, comparira' in html un alert di avvenuto invio ---
  dati_inviati:boolean = false;

  constructor() {}

  // --- metodo che si attiva quando utente fa click su invia ---
  invia():void {
    this.dati_inviati = true;
  }

  // --- PS: tutti gli errori sono gestiti in HTML, con form template-driven ---

}
