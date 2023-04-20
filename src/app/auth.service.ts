import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedUser, Login, Register } from './interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: Register): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "register", user);
  }

  login(user: Login): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "login", user);
  }

  setLoggedUser(user: LoggedUser) {
    // scrive LoggedUser nel Local Storage
    localStorage.setItem("user", JSON.stringify(user));
  }

  getLoggedUser(): LoggedUser | null {
    let userStorage = localStorage.getItem("user");
    if (userStorage != null) {
      let u: LoggedUser = JSON.parse(userStorage);
      return u;
    } else {
      return null;
    }
  }
}
