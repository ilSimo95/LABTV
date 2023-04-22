import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { BuyedFilm } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-acquistati',
  templateUrl: './film-acquistati.component.html',
  styleUrls: ['./film-acquistati.component.css']
})
export class FilmAcquistatiComponent implements OnInit {

  constructor(private ms:ManagerService, private router:Router) {}

  buyedFilms?:BuyedFilm[];

  ngOnInit(): void {
    this.getBuyedFilms();
  }

  getBuyedFilms():void {
    this.ms.getBuyedFilms().subscribe(
      {
        next: (data) => {
          this.buyedFilms = data;
      },
        error: () => this.router.navigate(["not-found"]),
        complete: () => console.log("Completed")
      });
  }

  restituisci(id:number):void {
    if(confirm("Sei sicuro di voler restituire il film?")) {
      this.ms.deleteBuyedFilms(id).subscribe(
      {
        next: (data) => {
          console.log(data);
      },
        error: () => this.router.navigate(["not-found"]),
        complete: () => this.getBuyedFilms()
      });
    }
  }

}
