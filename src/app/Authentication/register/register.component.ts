import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  account: any;
  reg: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: [
        '',
        Validators.required
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

  ngOnInIt(): void {}

  Register() {
    this.accountService.RegisterUser(this.registerForm.value).subscribe({
      next: (res) => {
        this.reg = res;
        // alert(this.reg.account.accountBalance);
        console.log(res, 'CHECKING SUCCESS');
      },
      error: (err) => {
        alert(err.error.message);
        console.log(err.error.message, 'CHECKING ERRORS');
      },
    });
  }
}
