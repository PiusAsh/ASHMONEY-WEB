import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickLoanComponent } from './quick-loan.component';

describe('QuickLoanComponent', () => {
  let component: QuickLoanComponent;
  let fixture: ComponentFixture<QuickLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
