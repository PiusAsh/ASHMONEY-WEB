import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCollectionComponent } from './loan-collection.component';

describe('LoanCollectionComponent', () => {
  let component: LoanCollectionComponent;
  let fixture: ComponentFixture<LoanCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
