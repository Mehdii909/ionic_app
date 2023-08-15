import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Produit1Component } from './produit1.component';

describe('Produit1Component', () => {
  let component: Produit1Component;
  let fixture: ComponentFixture<Produit1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Produit1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Produit1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
