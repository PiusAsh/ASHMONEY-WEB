import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginResponse, Registration } from 'src/app/Models/registration';
import { ServiceService } from 'src/app/Shared/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginResponse: LoginResponse = {
    Message: '',
    userData: '',
  };
  public loginForm!: FormGroup;
  user: Registration = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: 0,
    country: '',
    state: '',
    address: '',
    password: '',
    gender: '',
    dateOfBirth: new Date(),
    isAdmin: false,
    accountNumber: '',
    bankName: '',
    accountBalance: '',
    acctType: '',
    transactionPin: 0,
    dateCreated: new Date(),
    lastUpdated: new Date(),
    lastLoggedIn: new Date(),
  };
  
  constructor(
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private route: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // email: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }
  login() {
    this.user = this.loginForm.value;
    this.service.login(this.user).subscribe((res: any) => {
      this.loginResponse = res;
      console.log(res, 'CHECKING LOGGED IN USER DETAILS');
    });
  }
}
