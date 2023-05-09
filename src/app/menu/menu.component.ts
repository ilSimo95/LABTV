import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment.development';

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

  // --- controllo subito se siamo su disp. mobili ---
  ngOnInit(): void {
    this.checkSmart();
  }

  // --- funzione che controlla se ci troviamo su disp.mobili, inserita
  // per fare in modo che il pulsante "mia cineteca" vada dentro il menu
  // hamburger solo su disp mobili (tramite evento window:resize in HTML) ---
  checkSmart():void {
    console.log("heiu");
    if(window.innerWidth <= 992) {
      environment.isSmart = true;
    }
    else {
      environment.isSmart = false;
    }
  }

  // --- controllo il valore del booleano di ambiente per vedere se siamo su disp.mobili ---
  isSmart():boolean {
    return environment.isSmart;
  }
  
}
