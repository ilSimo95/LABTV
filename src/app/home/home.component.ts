import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { Film } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ms:ManagerService,
              private router:Router) {}

  films?:Film[];
  loading:boolean = true;
  searchKey:string = "";
  noResultsFound:boolean = false;

  ngOnInit(): void {
    // this.getFilms();
  }

  onImg(event:any):void {
    event.target.classList.add("opacized");
  }

  outImg(event:any):void {
    event.target.classList.remove("opacized");
  }

  getFilms():void {
    this.ms.getFilms().subscribe(
    {
      next: (data) => {
        console.log(data);
        this.films = data.items;
        this.loading = false;
      },
      error: (error) => this.router.navigate(["not-found"]),
      complete: () => console.log ("Processo terminato")
    });
  }

  cerca():void {
    if (this.films != null) {
      this.noResultsFound = false;
      this.films = this.ms.cerca(this.films!, this.searchKey);
      if (this.films.length == 0) {
        this.noResultsFound = true;
      }
    }
  }

  onKeydown(event:any):void {
    if(event.key == "Backspace" || event.key === "Delete") {
      if (this.searchKey.length == 1) {
        this.noResultsFound = false;
        this.getFilms();
      }
    }
    else if (event.key == "Enter") {
      this.cerca();
    }
  }

  reset():void {
    if (this.searchKey != "") {
      this.noResultsFound = false;
      this.getFilms();
    }
  }

}
