import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // --- componente che gestisce la rappresentazione del menu di navigazione su ogni pagina ---

  constructor(private auth:AuthService) {}

  // --- metodo per controllare se l'utente è attualmente loggato, controllando la variabile globale isLogged ---
  isLoggedIn():boolean {
    return this.auth.getLoggedIn();
  }

  // --- proprietà per capire se siamo su un dispositivo mobile o meno ---
  // --- la utilizzo solo per settare la visualizzazione differente del pulsante 'cineteca' ---
  isSmart:boolean = false;

  // --- quando istanzio il componente, setto la proprietà isSmart a true se siamo su disp. mobili, false altrimenti ---
  ngOnInit(): void {
    if(window.innerWidth <= 992) {
      this.isSmart = true;
    }
    else {
      this.isSmart = false;
    }
  }
  
}
