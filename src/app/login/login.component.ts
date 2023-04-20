import { Component } from '@angular/core';
import { Login, Register } from '../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
    console.log(this.loginModel);
  }

  login():void {
    console.log(this.registerModel);
  }
}
