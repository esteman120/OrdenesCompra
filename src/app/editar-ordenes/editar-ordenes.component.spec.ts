import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOrdenesComponent } from './editar-ordenes.component';

describe('EditarOrdenesComponent', () => {
  let component: EditarOrdenesComponent;
  let fixture: ComponentFixture<EditarOrdenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarOrdenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
