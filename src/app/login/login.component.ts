import { Component } from '@angular/core';
import { Login, Register } from '../modules/interfaces';
import { AuthService } from '../services/auth.service';
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

  // --- proprietà flag per controllare se ci sono o meno errori (lato server) dopo invio della form ---
  serverSpento:boolean = false;
  datiSbagliati:boolean = false;

  // --- metodo da eseguire quando l'utente clicca sul tasto di registrazione dopo aver compilato la form ---
  registra():void {
    this.serverSpento = false;
    // 1. tramite il service auth effettuo la GET API a http://localhost:3000/register
    this.auth.register(this.registerModel).subscribe(
    {
      next: (user) => {
        // 2. tramite il service auth inserisco l'utente e il token nel localStorage
        this.auth.setLoggedUser(user);
        // 3. tramite il service auth dichiaro che l'utente è loggato (incapsulamento)
        this.auth.setLoggedIn(true);
      },
      // 3. se il server non risponde, faccio visualizzare l'errore
      error: (e) => {
        if (e.name == "HttpErrorResponse" && e.status == 0) 
          this.serverSpento = true;
      },
      complete: () => console.log("Registrazione effettuata")
    });
  }

  // --- metodo da eseguire quando l'utente clicca sul tasto di login dopo aver compilato la form ---
  login():void {
    // 1. tramite il service auth effettuo la GET API a http://localhost:3000/login
    this.serverSpento = false;
    this.datiSbagliati = false;
    this.auth.login(this.loginModel).subscribe(
    {
      // 2. tramite il service auth effettuo tutto quello che ho fatto anche nel metodo della registrazione
      next: (user) => {
        this.auth.setLoggedUser(user);
        this.auth.setLoggedIn(true);
      },
      // 3. se il server non risponde, faccio visualizzare l'errore
      error: (e) => {
        if (e.name == "HttpErrorResponse" && e.status == 0) 
          this.serverSpento = true;
        else if (e.status == 400)
          this.datiSbagliati = true
      },
      complete: () => console.log("Login effettuato")
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
