import { Component, Input } from '@angular/core';
import { Film } from '../interfaces';
import { ManagerService } from '../manager.service';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-preview',
  templateUrl: './film-preview.component.html',
  styleUrls: ['./film-preview.component.css']
})
export class FilmPreviewComponent {

  constructor(private ms:ManagerService, private router:Router) {}

  @Input()
  film?:Film;

  isLoggedIn():boolean {
    return environment.isLogged;
  }

  buyFilm():void {
    if(confirm("Sei sicuro di voler acquistare il film?")) {
      this.ms.buyFilm(this.film!).subscribe(
      {
        next: (data) => {
          console.log(data);
      },
        error: () => this.router.navigate(["not-found"]),
        complete: () => this.router.navigate(["mychart"])
      });
    }
  }

  onImg(event:any):void {
    event.target.classList.add("opacized");
  }

  outImg(event:any):void {
    event.target.classList.remove("opacized");
  }

}
