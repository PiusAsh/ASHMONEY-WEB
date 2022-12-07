import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginResponse, Registration } from 'src/app/Models/registration';
import { ServiceService } from 'src/app/Shared/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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

  public registerForm!: FormGroup;
  loginResponse: LoginResponse = {
    Message: '',
    userData: '',
  };

  userAccount = '';
  Response: any;

  // GenerateAccount() {
  //   var account = new Date().getTime().toString();
  //   var code = account;
  //   var newAccount = code.slice(0, 10);
  //   this.userAccount = newAccount;
  //   console.log(newAccount);
  // }

  constructor(
    private formBuilder: FormBuilder,
    private http: ServiceService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        Validators.required,
        // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  Register() {
    this.user = this.registerForm.value;
    this.http.register(this.user).subscribe(
      (res: any) => {
        this.user = res;
        // this.registerForm.reset();
        console.log('******return login', this.Response);
        console.log('******return1', res);
        // this.route.navigate(['user/:id']);
        this.router.navigate(['login']);
      },
      (err) => {
         alert("Something went wrong")
        this.toast.error({
          detail: err.error.message,
          summary: 'Please try again later',
          duration: 4000,
        });
      }
    );
  }
}
