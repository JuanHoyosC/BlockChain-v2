import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueInfoComponent } from './bloque-info.component';

describe('BloqueInfoComponent', () => {
  let component: BloqueInfoComponent;
  let fixture: ComponentFixture<BloqueInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloqueInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloqueInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
