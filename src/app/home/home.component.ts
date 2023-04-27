import { Component, OnInit } from '@angular/core';
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
  
  // --- proprietà per memorizzare il totale dei film visualizzati attualmente ---
  actualEnd?:number;

  // --- proprietà a cui associare l'array JSON di film restituiti dal server API IMDB ---            
  films:Film[] = [];

  // --- proprietà a cui associare un sottoinsieme dei film (solo quelli attualmente visualizzati, in blocchi di 10) ---  
  toShowFilms:Film[] = [];

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

  // --- metodo per riempire la proprietà films con i risultati della GET (tramite service) ---
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
      complete: () => this.showFilms(0, 10)
    });
  }

  // --- metodo per riempire la proprietà showFilms di tanti film presenti in Film[] quanti chiamati dai parametri ---
  // --- es. se from=0 e to=10 riempirò questo array con i primi 10, se from=20 e to=30 con quelli tra quelle posizioni ---
  showFilms(from:number, to:number):void {
    this.actualEnd = to;
    for(let i=from; i<to; i++) {
      this.toShowFilms.push(this.films[i]);
    }
  }

  // --- metodo che controlla se l'utente ha scorso fino (quasi) in fondo alla pagina ---
  // --- se lo ha fatto, faccio visualizzare altri 10 film richiamando showFilms con la proprietà actualEnd incrementata ---
  onWindowScroll():void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        if (this.actualEnd != undefined) {
        this.showFilms(this.actualEnd+1, this.actualEnd+11);
        this.actualEnd = this.actualEnd + 10; // mi ricordo di incrementare actualEnd di 10
      }
    }
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
