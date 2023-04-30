import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // --- guard che serve per proteggere la rotta della chart da accesso diretto tramite URL ---
  // --- per accedervi dobbiamo essere necessariamente loggati sul sito

  constructor(private auth:AuthService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.getLoggedIn()) 
        return true;
      else{
        this.router.navigate(['login']);
        return false;
      }
  }
  
}
