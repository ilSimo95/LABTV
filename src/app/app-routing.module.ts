import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContattiComponent } from './contatti/contatti.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmAcquistatiComponent } from './film-acquistati/film-acquistati.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "film-detail/:id", component: FilmDetailComponent },
  { path: "mychart", component: FilmAcquistatiComponent},
  { path: "login", component: LoginComponent },
  { path: "contatti", component: ContattiComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
