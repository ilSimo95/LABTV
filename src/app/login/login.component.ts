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

  // --- componente che gestisce la registrazione e il login dell'utente ---

  constructor(private auth:AuthService) {}

  // --- proprietà oggetto JSON bindata con input HTML del form di registrazione ---
  registerModel:Register = {
    username: "",
    email: "",
    password: "",
    termini: false
  }

  // --- proprietà oggetto JSON bindata con input HTML del form di login ---
  loginModel:Login = {
    email: "",
    password: ""
  }

  // --- metodo da eseguire quando l'utente clicca sul tasto di registrazione dopo aver compilato la form ---
  registra():void {
    // 1. tramite il service auth effettuo la GET API a http://localhost:3000/register
    this.auth.register(this.registerModel).subscribe(u => {
      // 2. tramite il service auth inserisco l'utente e il token nel localStorage
      this.auth.setLoggedUser(u);
      // 3. tramite il service auth dichiaro che l'utente è loggato (incapsulamento)
      this.auth.setLoggedIn(true);
    });
  }

  // --- metodo da eseguire quando l'utente clicca sul tasto di login dopo aver compilato la form ---
  login():void {
    // 1. tramite il service auth effettuo la GET API a http://localhost:3000/login
    this.auth.login(this.loginModel).subscribe(u => {
      // 2. tramite il service auth effettuo tutto quello che ho fatto anche nel metodo della registrazione
      this.auth.setLoggedUser(u);
      this.auth.setLoggedIn(true);
    });
  }

  // --- metodo per controllare se l'utente è attualmente loggato, controllando la variabile globale isLogged ---
  isLoggedIn():boolean {
    return this.auth.getLoggedIn();
  }

  // --- metodo da invocare quando l'utente fa click sul tasto di logout ---
  logout():void {
    // tramite il service auth tolgo lo user dal localStorage e setto isLogged globale a false
    this.auth.logout();
  }
}
