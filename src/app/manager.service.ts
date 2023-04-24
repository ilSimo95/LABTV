import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BuyedFilm, BuyedFilmPost, Film, FilmContainer } from './interfaces';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http:HttpClient,
              private auth:AuthService) { }

  URL_1:string = "https://imdb-api.com/en/API/MostPopularMovies/k_f8p31cw1";
  URL_2:string = "https://imdb-api.com/it/API/Title/k_f8p31cw1/";
  URL_3:string = "https://imdb-api.com/en/API/YouTubeTrailer/k_f8p31cw1/";

  getFilms(): Observable<FilmContainer> {
    return this.http.get<FilmContainer>(this.URL_1);
  }

  getFilmDetail(id:string): Observable<any> {
    return this.http.get(this.URL_2 + id);
  }

  getTrailer(id:string): Observable<any> {
    return this.http.get(this.URL_3 + id);
  }

  cerca(films:Film[], key:string): Film[] {
    const newFilms:Film[] = [];
    for (const film of films) {
      if (film.title.includes(key)) {
        newFilms.push(film);
      }
    }
    return newFilms;
  }

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

  getBuyedFilms():Observable<BuyedFilm[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.auth.getLoggedUser()!.accessToken
      })
    }
    return this.http.get<BuyedFilm[]>(environment.USER_API_BASE_URL + "films-acquistati", httpOptions);
  }

  deleteBuyedFilms(id:number):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.auth.getLoggedUser()!.accessToken
      })
    }
    return this.http.delete(environment.USER_API_BASE_URL + "films-acquistati/" + id, httpOptions);
  }

}
