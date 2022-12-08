import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // email: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  login(){

  }
}
