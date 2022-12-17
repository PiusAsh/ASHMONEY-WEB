import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersuccessPageComponent } from './usersuccess-page.component';

describe('UsersuccessPageComponent', () => {
  let component: UsersuccessPageComponent;
  let fixture: ComponentFixture<UsersuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersuccessPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
