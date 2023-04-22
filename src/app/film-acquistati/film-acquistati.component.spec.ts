import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmAcquistatiComponent } from './film-acquistati.component';

describe('FilmAcquistatiComponent', () => {
  let component: FilmAcquistatiComponent;
  let fixture: ComponentFixture<FilmAcquistatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmAcquistatiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmAcquistatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
