import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http:HttpClient) { }

  URL_1:string = "https://imdb-api.com/en/API/MostPopularMovies/k_cs9z4hao";
  URL_2:string = "https://imdb-api.com/it/API/Title/k_cs9z4hao/";

  getFilms(): Observable<any> {
    return this.http.get(this.URL_1);
  }

  getFilmDetail(id:string): Observable<any> {
    return this.http.get(this.URL_2 + id);
  }
}
