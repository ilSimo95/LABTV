import { Component } from '@angular/core';
import { Login, Register } from '../interfaces';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth:AuthService) {}

  loginOK:boolean = false;
  registerOK:boolean = false;

  registerModel:Register = {
    username: "",
    email: "",
    password: "",
    ripetiPassword: "",
    termini: false
  }

  loginModel:Login = {
    email: "",
    password: ""
  }

  registra():void {
    this.registerOK = true;
    /* this.auth.register(this.registerModel).subscribe(u => {
      this.auth.setLoggedUser(u);
    }); */
  }

  login():void {
    this.loginOK = true;
    /* this.auth.login(this.loginModel).subscribe(u => {
      this.auth.setLoggedUser(u);
    }); */
  }
}
