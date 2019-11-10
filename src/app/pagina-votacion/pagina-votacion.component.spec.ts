import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaVotacionComponent } from './pagina-votacion.component';

describe('PaginaVotacionComponent', () => {
  let component: PaginaVotacionComponent;
  let fixture: ComponentFixture<PaginaVotacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaVotacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaVotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
