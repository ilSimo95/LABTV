import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { BuyedFilm } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-acquistati',
  templateUrl: './film-acquistati.component.html',
  styleUrls: ['./film-acquistati.component.css']
})
export class FilmAcquistatiComponent implements OnInit {

  // --- componente che viene eseguito quando l'utente ha acquistato un film o ha fatto click sul pulsante "Cineteca" ---

  constructor(private ms:ManagerService, private router:Router) {}

  // --- proprieta' che dovra' contenere tutti i film presenti in http://localhost:3000/films-acquistati/ ---
  buyedFilms?:BuyedFilm[];

  // --- all'avvio del componente, riempio l'array buyedFilms con tutti i film comprati invocando getBuyedFilms ---
  ngOnInit(): void {
    this.getBuyedFilms();
  }

  // --- metodo per riempire la proprieta' buyedFilms con i film presenti in http://localhost:3000/films-acquistati/ ---
  getBuyedFilms():void {
    // flag per capire se e' stato trovato un duplicato, ossia un film gia' acquistato in precedenza
    let trovatoDuplicato:boolean = false;
    // effettuo la chiamata API al server per ottenere la lista dei film acquistati
    this.ms.getBuyedFilms().subscribe(
      {
        next: (data) => {
          // per ogni film acquistato presente...
          for (let i=0; i<data.length-1; i++) {
            // ... scorro tutti gli altri...
            for (let j=i+1; j<data.length; j++) {
              // ... e se trovo due film uguali...
              if (data[i].film.id == data[j].film.id) {
                // ... setto il flag a true ed effettuo una chiamata API DELETE su quel film...
                trovatoDuplicato = true;
                this.ms.deleteBuyedFilms(data[j].id).subscribe(
                  {
                    next: () => {
                      // ... infine effettuo una nuova chiamata API GET dei film acquistati...
                      this.ms.getBuyedFilms().subscribe(cleanedData =>
                        // ... e riempio così il mio buyedFilms con risultati senza duplicati
                        this.buyedFilms = cleanedData
                      );
                    }
                  }
                );
              }
            }
          }
          // se non sono stati trovati duplicati (dunque ho acquistato un film per la prima volta)...
          if (trovatoDuplicato == false) {
            // ... riempio il mio buyedFilms con i risultati della GET API al server
            this.buyedFilms = data;
          }
      },
        // se si sono verificati errori, mostro la pagina di 404 Not Found
        error: () => this.router.navigate(["not-found"]),
      });
  }

  // --- metodo da eseguire quando l'utente clicca sul pulsante "restituisci" associato a un film comprato ---
  restituisci(id:number):void {
    if(confirm("Sei sicuro di voler restituire il film?")) {
      // se l'utente e' sicuro di farlo, effettuo una chiamata API DELETE passando l'id del film da restituire (=eliminare)
      this.ms.deleteBuyedFilms(id).subscribe(
      {
        next: (data) => {
          console.log(data);
      },
        // in caso di errore mostro la pagina 404 Not Found
        error: () => this.router.navigate(["not-found"]),
        // una volta finito tutto, ri-effettuo la GET in modo da avere i film acquistati tranne quello restituito
        complete: () => this.getBuyedFilms()  
      });
    }
  }

}
