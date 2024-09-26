import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulatedDateComponent } from './simulated-date.component';

describe('SimulatedDateComponent', () => {
  let component: SimulatedDateComponent;
  let fixture: ComponentFixture<SimulatedDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatedDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});