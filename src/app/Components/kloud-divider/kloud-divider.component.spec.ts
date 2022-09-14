import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KloudDividerComponent } from './kloud-divider.component';

describe('KloudDividerComponent', () => {
  let component: KloudDividerComponent;
  let fixture: ComponentFixture<KloudDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KloudDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KloudDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
