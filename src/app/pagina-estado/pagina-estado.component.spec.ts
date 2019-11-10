import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEstadoComponent } from './pagina-estado.component';

describe('PaginaEstadoComponent', () => {
  let component: PaginaEstadoComponent;
  let fixture: ComponentFixture<PaginaEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
