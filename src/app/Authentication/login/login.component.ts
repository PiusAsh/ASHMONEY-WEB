import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  public phoneNumber!: AbstractControl;
  public password!: AbstractControl;
  public email!: AbstractControl;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private accountService: AccountService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   password: ['', Validators.required],
    //   phoneNumber: ['', Validators.required],
    // });

    this.loginForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      // email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
    });
  }

  public sendLogin(): void {
    console.log(this.loginForm.value, 'CHECKING VALUE');
  }

  login() {
    this.spinner.show();
    this.accountService.LoginUser(this.loginForm.value).subscribe({
      next: (res) => {
        res.lastLoggedIn = new Date();
        console.log(res, 'CHECKING SUCCESS');
        console.log(res, 'CHECKING SUCCESS RES');
        console.log(this.loginForm.value, 'CHECKING FORM VALUE');
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err, 'CHECKING ERROR');
        this.spinner.hide();
      },
    });
  }

  lastLoggedIn() {
    localStorage.setItem('lastLoggedInTime', new Date().toString());
  }
}
