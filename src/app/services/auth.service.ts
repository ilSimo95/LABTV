import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedUser, Login, Register } from '../modules/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // --- servizio per contenere le principali funzioni legate all'autenticazione dell'utente ---

  constructor(private http: HttpClient) { }

  // --- proprietà privata accessibile tramite metodi pubblici (incapsulam.) per sapere se utente è loggato ---
  private isLoggedIn:boolean = false;

  // --- metodo per verificare se l'utente è loggato o meno ---
  getLoggedIn():boolean {
    return this.isLoggedIn;
  }

  // --- metodo per modificare lo stato di login (da loggato e viceversa) ---
  setLoggedIn(value:boolean){
    this.isLoggedIn = value;
  }

  // --- metodo per inviare una POST al server locale con l'oggetto rappresentantel'utente registrato al sito ---
  register(user: Register): Observable<LoggedUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "register", user, httpOptions);
  }

  // --- metodo per inviare una POST al server locale con l'oggetto rappresentantel'utente loggato al sito ---
  login(user: Login): Observable<LoggedUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "login", user, httpOptions);
  }

  // --- metodo per salvare i dati dello user e il suo access Token sul localStorage (una volta loggato) ---
  setLoggedUser(user: LoggedUser) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  // --- metodo per leggere i dati dello user e il suo access Token sul localStorage (una volta loggato) ---
  getLoggedUser(): LoggedUser | null {
    let userStorage = localStorage.getItem("user");
    if (userStorage != null) {
      return JSON.parse(userStorage);
    } else {
      return null;
    }
  }

  // --- metodo per effettuare il logout dello user, rimuovendo i suoi dati dal localStorage e dichiarandolo non loggato (flag) ---
  logout():void {
    if (confirm("Vuoi effettuare il logout?")) {
      localStorage.removeItem("user");
      this.setLoggedIn(false);
    }
  }

}
