import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ms:ManagerService) {}

  films?:Array<any>;

  ngOnInit(): void {
    this.getFilms();
  }

   onImg(event:any):void {
    event.target.classList.add("opacized");
  }

  outImg(event:any):void {
    event.target.classList.remove("opacized");
  }

  getFilms():void {
    this.ms.getFilms().subscribe(data => {
      this.films = data.items;
      console.log(this.films);
    });
  }

}
