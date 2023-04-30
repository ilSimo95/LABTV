import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BuyedFilm, BuyedFilmPost, Film, FilmContainer, FilmDetail } from '../modules/interfaces';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  // --- service con le principali funzioni usate nel progetto ---

  constructor(private http:HttpClient,
              private auth:AuthService) { }

  // --- 3 proprietà associate alle 3 URL delle API IMDB utilizzate ---
  URL_1:string = "https://imdb-api.com/it/API/MostPopularMovies/k_f8p31cw1/";
  URL_2:string = "https://imdb-api.com/it/API/Title/k_f8p31cw1/";
  URL_3:string = "https://imdb-api.com/it/API/YouTubeTrailer/k_f8p31cw1/";

  // --- metodo che effettua una GET API alla URL1 per ottenere tutti i film più popolari in JSON ---
  getFilms(): Observable<FilmContainer> {
    return this.http.get<FilmContainer>(this.URL_1);
  }

  // --- metodo che effettua una GET API alla URL 2 per ottenere i dettagli di un film (in JSON) avendo l'id ---
  getFilmDetail(id:string): Observable<FilmDetail> {
    return this.http.get<FilmDetail>(this.URL_2 + id);
  }

  // --- metodo che effettua una GET API alla URL 3 per ottenere il link a trailer YT di un film ---
  getTrailer(id:string): Observable<any> {
    return this.http.get(this.URL_3 + id);
  }

  // --- metodo per filtrare i film mostrati sulla base della search key inserita nel form di ricerca ---
  cerca(films:Film[], key:string): Film[] {
    const newFilms:Film[] = films.filter(film => film.title.includes(key));
    return newFilms;
  }

  // --- metodo per inviare in POST al server locale un nuovo film acquistato, usando autenticaz. Bearer con token ---
  buyFilm(film: Film):Observable<BuyedFilm[]> {
    let filmAcquistato: BuyedFilmPost = {
      userId: this.auth.getLoggedUser()!.user.id,
      film: film
    };
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.auth.getLoggedUser()!.accessToken
      })
    }
    return this.http.post<BuyedFilm[]>(environment.USER_API_BASE_URL + "films-acquistati", filmAcquistato, httpOptions);
  }

  // --- metodo per ottenere la lista di tutti i film acquistati, effettuando una GET al server locale ---
  getBuyedFilms():Observable<BuyedFilm[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.auth.getLoggedUser()!.accessToken
      })
    }
    return this.http.get<BuyedFilm[]>(environment.USER_API_BASE_URL + "films-acquistati", httpOptions);
  }

  // --- metodo per effettuare una DELETE al server locale per "restituire" un film acquistato (passando l'id) ---
  deleteBuyedFilms(id:number):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.auth.getLoggedUser()!.accessToken
      })
    }
    return this.http.delete(environment.USER_API_BASE_URL + "films-acquistati/" + id, httpOptions);
  }

}
