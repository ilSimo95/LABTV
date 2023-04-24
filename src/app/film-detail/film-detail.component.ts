import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../manager.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  // --- componente che viene eseguito quando l'utente clicca sull'img di un film nella home ---

  // --- proprieta' per memorizzare l'ID del film da visualizzare, presente anche nella URL ---
  id?:string;

  // --- proprieta' che ogni volta sarà l'oggetto restituito dal server con tutti i dettagli di un film ---
  film_details:any;

  // --- proprieta' per memorizzare la URL del trailer del film una volta "ripulita" dai controlli YouTube ---
  trailer_URL:string = "";

  // --- serie di 4 flags per gestire le tendine post-click sui pulsanti "vedi cast" e "vedi trailer" in HTML ---
  primaTendinaChiusa: boolean = true;
  primaTendinaAperta: boolean = false;
  secondaTendinaChiusa: boolean = true;
  secondaTendinaAperta: boolean = false;

  constructor (private route: ActivatedRoute,
                private router: Router,
                private ms: ManagerService,
                private sanitize: DomSanitizer) {}

  // --- all'avvio, invoco questi tre metodi del componente per riempire le proprieta' id, film_details e trailer_URL ---
  ngOnInit(): void {
    this.id = this.getID();
    this.getFilmDetails();
    this.getFilmTrailer();
  }

  // --- metodo per catturare l'ID presente nella URL (inserito come /:id in routes) e associarlo alla mia proprieta' id ---
  getID():string {
    return String(this.route.snapshot.paramMap.get("id")); 
  }

  // --- metodo per ottenere (tramite service) dettagli di un film tramite le API di IMDB passando l'id del film ---
  getFilmDetails():void {
    if (this.id != undefined) {
      this.ms.getFilmDetail(this.id).subscribe(
      {
        next: (data) => {
          // il risultato lo associo alla proprieta' film_details
          this.film_details = data;
        },
        error: () => this.router.navigate(["not-found"]),
        complete: () => console.log ("Processo terminato")
      });
    }
    // se non riesco ad avere un id valido da passare, vado a 404 Not Found (pressoche' impossibile)
    else {
      this.router.navigate(["not-found"]);
    }
  }

  // --- metodo per ottenere (tramite service) il trailer di un film tramite API IMDB passando l'id del film ---
  getFilmTrailer():void {
    if (this.id != undefined) {
      this.ms.getTrailer(this.id).subscribe(
      {
        next: (data) => {
          console.log(data);
          // sostituisco "watch?v=" con "embed/" in modo da permettere la visione in iframe HTML del video YT
          this.trailer_URL = data.videoUrl.replace("watch?v=", "embed/");
        },
        error: () => this.router.navigate(["not-found"]),
        complete: () => console.log ("Processo terminato")
      });
    }
    else {
      this.router.navigate(["not-found"]);
    }
  }

  // --- metodo per "sanificare" la URL del trailer tramite service DomSanitizer, secondo controllo per permettere la visione in iframe HTML del video YT ---
  videoURL():SafeResourceUrl {
    return this.sanitize.bypassSecurityTrustResourceUrl(this.trailer_URL);
  }

  // --- primo metodo per gestire i flag dell'apertura delle tendine di "vedi cast" e "vedi trailer" ---
  primaTendina():void {
    if (this.primaTendinaChiusa == true) {
      this.primaTendinaChiusa = false;
      this.primaTendinaAperta = true;
    }
    else {
      this.primaTendinaChiusa = true;
      this.primaTendinaAperta = false;
    }
  }

  // --- secondo metodo per gestire i flag dell'apertura delle tendine di "vedi cast" e "vedi trailer" ---
  secondaTendina():void {
    if (this.secondaTendinaChiusa == true) {
      this.secondaTendinaChiusa = false;
      this.secondaTendinaAperta = true;
    }
    else {
      this.secondaTendinaChiusa = true;
      this.secondaTendinaAperta = false;
    }
  }

}
