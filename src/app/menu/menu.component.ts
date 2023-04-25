import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  // --- componente che gestisce la rappresentazione del menu di navigazione su ogni pagina ---

  constructor(private auth:AuthService) {}

  // --- metodo per controllare se l'utente è attualmente loggato, controllando la variabile globale isLogged ---
  isLoggedIn():boolean {
    return this.auth.getLoggedIn();
  }
  
}
