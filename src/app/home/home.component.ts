import { Component, Input, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { Film } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // --- questo componente è una sorta di "film-list" da eseguire al caricamento del sito ---

  constructor(private ms:ManagerService,
              private router:Router) {}

  // --- proprietà a cui associare l'array JSON di film restituiti dal server API IMDB ---            
  films?:Film[];

  // --- flag per controllare se la chiamata GET è già finita (false) o siamo sempre in attesa (true) ---
  loading:boolean = true;

  // --- proprietà per salvare il valore inserito nel form di ricerca HTML, bindata con esso ---
  searchKey:string = "";

  // --- flag per controllare se la chiave searchKey inserita non corrisponde a nulla nella home page ---
  noResultsFound:boolean = false;

  // --- al caricamento della pagina, effettuo la chiamata API GET per ottenere i film più popolari ---
  ngOnInit(): void {
    this.getFilms();
  }

  // --- questo è il metodo addetto: lo facciamo sempre in "due mani", tramite service ---
  getFilms():void {
    this.ms.getFilms().subscribe(
    {
      // se tutto okay, associo i dati ricevuti alla proprietà films e setto a false il flag loading
      next: (data) => {
        console.log(data);
        this.films = data.items;
        this.loading = false;
      },
      error: () => this.router.navigate(["not-found"]),
      complete: () => console.log ("Processo terminato")
    });
  }


  // --- 3 METODI PER GESTIRE IL FORM DI RICERCA --- //

  // --- metodo da invocare al click sul tasto cerca del form: filtra solo i film che hanno la searchKey nel titolo ---
  cerca():void {
    if (this.films != null) {
      this.noResultsFound = false;
      this.films = this.ms.cerca(this.films!, this.searchKey);
      if (this.films.length == 0) {
        this.noResultsFound = true;
      }
    }
  }

  // --- metodo da invocare quando l'utente cancella con la tastiera la form di ricerca ---
  onKeydown(event:any):void {
    if(event.key == "Backspace" || event.key === "Delete") {
      if (this.searchKey.length == 1) {
        // se l'utente ha cancellato tutta la parola, allora faccio visualizzare nuovamente tutti i film (zero filtri)
        this.noResultsFound = false;
        this.getFilms();
      }
    }
    // associo anche al tasto ENTER la ricerca, come ho fatto prima col tasto cerca
    else if (event.key == "Enter") {
      this.cerca();
    }
  }

  // --- metodo da invocare quando l'utente fa click sulla x dentro la form di ricerca ---
  reset():void {
    if (this.searchKey != "") {
      this.noResultsFound = false;
      // come prima, faccio visualizzare nuovamente tutti i film (azzero i filtri)
      this.getFilms();
    }
  }

}
