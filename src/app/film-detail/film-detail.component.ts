import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  id?:string;
  film_details:any;

  constructor (private route: ActivatedRoute,
                private router: Router,
                private ms: ManagerService) {}

  ngOnInit(): void {
    this.id = this.getID();
    this.getFilmDetails();
  }

  getID():string {
    return String(this.route.snapshot.paramMap.get("id")); 
  }

  getFilmDetails():void {
    if (this.id != undefined) {
      this.ms.getFilmDetail(this.id).subscribe(data => {
        console.log(data);
        this.film_details = data;
      });
    }
    else {
      this.router.navigate(["not-found"]);
    }
  }

}
