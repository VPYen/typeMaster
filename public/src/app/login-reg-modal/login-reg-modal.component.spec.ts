import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegModalComponent } from './login-reg-modal.component';

describe('LoginRegModalComponent', () => {
  let component: LoginRegModalComponent;
  let fixture: ComponentFixture<LoginRegModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
