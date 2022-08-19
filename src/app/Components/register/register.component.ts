import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Registration } from 'src/app/Models/registration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: Registration = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: 0,
    country: '',
    acctNo: 0,
    dob: '',
    password: 0,
    id: 0
  };

  public registerForm!: FormGroup;

  userAccount = '';

  GenerateAccount() {
    var account = new Date().getTime().toString();
    var code = account;
    var newAccount = code.slice(0, 10);
    this.userAccount = newAccount;
    console.log(newAccount);
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],
      password: ['', Validators.required],
      acctNo: ['', Validators.required],
      dob: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  register() {
    this.http
      .post<any>('http://localhost:3000/register', this.registerForm.value)
      .subscribe(
        (res) => {
          // alert('User Successfully Registered');
          this.toast.success({
            detail: 'Successfully Registered',
            summary: 'Please login',
            duration: 4000,
          });
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          // alert("Something went wrong")
          this.toast.error({
            detail: 'Registration failed',
            summary: 'Please try again later',
            duration: 6000,
          });
        }
      );
  }

}
