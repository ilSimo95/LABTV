import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager.service';
import { Film } from '../modules/interfaces';
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

  // --- proprietà che funge da contenitore per tutti gli ID dei film ottenuti dalla GET ---
  id_container:Array<string> = [];

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
        for (const f of this.films) {
          this.id_container.push(f.id);
        }
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
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
        if (this.actualEnd != undefined && this.actualEnd+11 <= 100) {
        this.showFilms(this.actualEnd, this.actualEnd+11);
      }
    }
  }

  // --- metodo da attivare quando l'utente fa click sul tasto del dado ---
  // --- viene generato un numero random da 0 a 99 e viene reindirizzato l'utente a una pagina tipo film-detail/tt097 ---
  // --- il numero random viene usato come indice dell'array di id dei film (id_container) ---
  showRandom():void {
    let random = Math.floor(Math.random()*100);
    this.router.navigate(["film-detail/" + this.id_container[random]]);
  }

}
