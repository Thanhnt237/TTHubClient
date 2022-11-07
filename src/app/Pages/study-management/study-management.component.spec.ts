import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyManagementComponent } from './study-management.component';

describe('StudyManagementComponent', () => {
  let component: StudyManagementComponent;
  let fixture: ComponentFixture<StudyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
