import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GObjetivoComponent } from './g-objetivo.component';

describe('GObjetivoComponent', () => {
  let component: GObjetivoComponent;
  let fixture: ComponentFixture<GObjetivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GObjetivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GObjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
