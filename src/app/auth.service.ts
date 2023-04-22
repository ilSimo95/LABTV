import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film, LoggedUser, Login, Register } from './interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private isLoggedIn:boolean = false;

  getLoggedIn():boolean {
    return this.isLoggedIn;
  }

  setLoggedIn(value:boolean){
    this.isLoggedIn = value;
  }

  register(user: Register): Observable<LoggedUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "register", user, httpOptions);
  }

  login(user: Login): Observable<LoggedUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "login", user, httpOptions);
  }

  setLoggedUser(user: LoggedUser) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getLoggedUser(): LoggedUser | null {
    let userStorage = localStorage.getItem("user");
    if (userStorage != null) {
      return JSON.parse(userStorage);
    } else {
      return null;
    }
  }

}
