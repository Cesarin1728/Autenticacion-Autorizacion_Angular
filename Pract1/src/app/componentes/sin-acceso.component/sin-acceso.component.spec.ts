import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinAccesoComponent } from './sin-acceso.component';

describe('SinAccesoComponent', () => {
  let component: SinAccesoComponent;
  let fixture: ComponentFixture<SinAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinAccesoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SinAccesoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
