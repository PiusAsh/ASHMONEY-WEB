import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public loginForm! : FormGroup
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: Router, private toast : NgToastService ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  login(){
    this.http.get<any>('http://localhost:3000/register')
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.phoneNo === this.loginForm.value.phoneNo && a.password === this.loginForm.value.password
      });
      if(user){
        // alert("Successfully Logged In");
         this.toast.success({
           detail: 'Successfully Logged In',
           summary: "Welcome on board",
           duration: 4000,
         });
        this.loginForm.reset();
        this.route.navigate(['user'])
      }else{
        // alert("User Not Found");
        this.toast.error({
          detail: 'User Not Found',
          summary: "Account doesn't exist",
          duration: 4000,
        });
      }
    }, err=>{
      // alert("Something went wrong")
      this.toast.info({
        detail: 'Something went wrong',
        summary: "Check your internet connection",
        duration: 4000,
      });
    })

  }
}
