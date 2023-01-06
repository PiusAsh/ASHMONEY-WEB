import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private accountService: AccountService,
    private spinner: NgxSpinnerService
  ) {
    // Custom validator function to check that the password and confirm password fields match
    function passwordMatchValidator(g: FormGroup) {
      const password = g.get('password');
      const confirmPassword = g.get('confirmPassword');
      if (
        password &&
        confirmPassword &&
        password.value === confirmPassword.value
      ) {
        return null;
      } else {
        return { mismatch: true };
      }
    }

    // DATE OF BIRTH

    function minAgeValidator(
      control: AbstractControl
    ): { [key: string]: boolean } | null {
      const dateOfBirth = new Date(control.value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
      return age < 18 ? { minAge: true } : null;
    }

    this.registerForm = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        email: [
          '',
          Validators.required,
          // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
        phoneNumber: ['', Validators.required],
        password: ['', Validators.required],
        dateOfBirth: ['', [Validators.required, minAgeValidator]],
        address: ['', Validators.required],
        gender: ['', Validators.required],
        confirmPassword: ['', Validators.required, Validators.compose],
      },
      { validators: passwordMatchValidator }
    );
  }

  ngOnInIt(): void {}

  Register() {
    this.spinner.show();
    this.accountService.RegisterUser(this.registerForm.value).subscribe({
      next: (res) => {
        this.reg = res;
        this.spinner.hide();
        // alert(this.reg.account.accountBalance);
        console.log(res, 'CHECKING SUCCESS');
      },
      error: (err) => {
        
        // alert(err.error.message);
        console.log(err.error.message, 'CHECKING ERRORS');
      },
    });
  }

  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const date = new Date(control.value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - date.getFullYear();
      return age < minAge ? { minAge: { value: control.value } } : null;
    };
  }
}
