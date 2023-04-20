import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Film, FilmContainer } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http:HttpClient) { }

  URL_1:string = "https://imdb-api.com/en/API/MostPopularMovies/k_cs9z4hao";
  URL_2:string = "https://imdb-api.com/it/API/Title/k_cs9z4hao/";
  URL_3:string = "https://imdb-api.com/en/API/YouTubeTrailer/k_cs9z4hao/";

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

}
