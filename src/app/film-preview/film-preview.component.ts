import { Component, Input } from '@angular/core';
import { Film } from '../modules/interfaces';
import { ManagerService } from '../services/manager.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-film-preview',
  templateUrl: './film-preview.component.html',
  styleUrls: ['./film-preview.component.css']
})
export class FilmPreviewComponent {

  // --- componente che viene eseguito quando il sito si avvia: si occupa di gestire la rappresentazione di ogni film-card in home ---

  constructor(private ms:ManagerService, private router:Router, private auth:AuthService) {}

  // --- proprieta' col decoratore @Input che avrà come valore un oggetto JSON che rappresenta un film tra i 100 restituiti dal server: uno diverso ad ogni ciclo *ngFor in HTML ---
  @Input()
  film?:Film;

  // --- metodo per controllare se l'utente è attualmente loggato, controllando la variabile globale isLogged ---
  isLoggedIn():boolean {
    return this.auth.getLoggedIn();
  }

  // --- metodo da eseguire quando l'utente clicca sul tasto carrello di un film ---
  buyFilm():void {
    if(confirm("Sei sicuro di voler acquistare il film?")) {
      // col metodo del service, eseguo una POST a http://localhost:3000/films-acquistati/ passando il JSON del film
      this.ms.buyFilm(this.film!).subscribe(
      {
        next: (data:any) => {
          console.log(data);
        },
        error: () => this.router.navigate(["not-found"]),
        complete: () => this.router.navigate(["mychart"])
      });
    }
  }

  // --- metodo da eseguire quando l'utente entra col mouse su una card di un film ---
  onImg(event:any):void {
    event.target.classList.add("opacized");
  }

  // --- metodo da eseguire quando l'utente esce col mouse su una card di un film ---
  outImg(event:any):void {
    event.target.classList.remove("opacized");
  }

}
