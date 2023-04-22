import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../manager.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  id?:string;
  film_details:any;
  trailer_URL:string = "";
  primaTendinaChiusa: boolean = true;
  primaTendinaAperta: boolean = false;
  secondaTendinaChiusa: boolean = true;
  secondaTendinaAperta: boolean = false;

  constructor (private route: ActivatedRoute,
                private router: Router,
                private ms: ManagerService,
                private sanitize: DomSanitizer) {}

  ngOnInit(): void {
    this.id = this.getID();
    this.getFilmDetails();
    this.getFilmTrailer();
  }

  getID():string {
    return String(this.route.snapshot.paramMap.get("id")); 
  }

  getFilmDetails():void {
    if (this.id != undefined) {
      this.ms.getFilmDetail(this.id).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.film_details = data;
        },
        error: () => this.router.navigate(["not-found"]),
        complete: () => console.log ("Processo terminato")
      });
    }
    else {
      this.router.navigate(["not-found"]);
    }
  }

  getFilmTrailer():void {
    if (this.id != undefined) {
      this.ms.getTrailer(this.id).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.trailer_URL = data.videoUrl.replace("watch?v=", "embed/");
        },
        error: () => this.router.navigate(["not-found"]),
        complete: () => console.log ("Processo terminato")
      });
    }
    else {
      this.router.navigate(["not-found"]);
    }
  }

  videoURL():SafeResourceUrl {
    return this.sanitize.bypassSecurityTrustResourceUrl(this.trailer_URL);
  }

  primaTendina():void {
    if (this.primaTendinaChiusa == true) {
      this.primaTendinaChiusa = false;
      this.primaTendinaAperta = true;
    }
    else {
      this.primaTendinaChiusa = true;
      this.primaTendinaAperta = false;
    }
  }

  secondaTendina():void {
    if (this.secondaTendinaChiusa == true) {
      this.secondaTendinaChiusa = false;
      this.secondaTendinaAperta = true;
    }
    else {
      this.secondaTendinaChiusa = true;
      this.secondaTendinaAperta = false;
    }
  }

}
