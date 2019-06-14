import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOrdenCompraComponent } from './ver-orden-compra.component';

describe('VerOrdenCompraComponent', () => {
  let component: VerOrdenCompraComponent;
  let fixture: ComponentFixture<VerOrdenCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerOrdenCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
