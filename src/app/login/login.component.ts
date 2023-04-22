import { Component } from '@angular/core';
import { Login, Register } from '../interfaces';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth:AuthService) {}

  registerModel:Register = {
    username: "",
    email: "",
    password: "",
    termini: false
  }

  loginModel:Login = {
    email: "",
    password: ""
  }

  registra():void {
    this.auth.register(this.registerModel).subscribe(u => {
      this.auth.setLoggedUser(u);
      this.auth.setLoggedIn(true);
      environment.isLogged = this.auth.getLoggedIn();
    });
  }

  login():void {
    this.auth.login(this.loginModel).subscribe(u => {
      this.auth.setLoggedUser(u);
      this.auth.setLoggedIn(true);
      environment.isLogged = this.auth.getLoggedIn();
    });
  }

  isLoggedIn():boolean {
    return environment.isLogged;
  }

  logout():void {
    this.auth.logout();
  }
}
