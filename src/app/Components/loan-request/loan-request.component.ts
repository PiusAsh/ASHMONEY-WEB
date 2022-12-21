import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanRequestModel } from 'src/app/Model/loan';
import { AccountService } from 'src/app/Services/account.service';
import { LoanRequestService } from 'src/app/Services/loan-request.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css'],
})
export class LoanRequestComponent implements OnInit {
  loanRequestForm!: FormGroup;
  acct: any;
  userAcct: any;
  loanInfo: any;
  timerInterval: any;
  result: any;

  constructor(
    private formBuilder: FormBuilder,
    private loanRequestService: LoanRequestService,
    private route: Router,
    private accountService: AccountService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id: any = params.get('id');
      //  alert(id);
      if (id) {
        this.accountService.GetAccountById(id).subscribe({
          next: (res) => {
            this.userAcct = res;
            console.log(this.userAcct, 'ACTIVATED ROUTE');
          },
        });
      }
    });
    this.loanRequestForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      amount: ['', Validators.required],
      purpose: ['', Validators.required],
      repaymentPeriod: ['', Validators.required],
    });
  }

  onSubmit() {
    const loanRequest = this.loanRequestForm.value as LoanRequestModel;
    loanRequest.clientId = this.userAcct.id;
    this.loanRequestService.sendLoanRequest(loanRequest).subscribe(
      (response) => {
        this.loanInfo = response;

        Swal.fire({
          title: 'Processing...',
          // html: 'Processing...',
          timer: 4000,
          timerProgressBar: true,
          showCancelButton: false,
          showConfirmButton: false,
          padding: '5em',
          willClose: () => {
            clearInterval(this.timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
              title: 'Loan Approved',
              text: `Your account has been Credited with ₦${this.loanRequestForm.value.amount}`,
              icon: 'success',
              iconColor: '#008000',
              // color: '#C31E39',
              backdrop: `
    #c31e3a3d
    left top
    no-repeat
  `,
              confirmButtonText: 'OK',
              confirmButtonColor: '#C31E39',
            }).then((result) => {
              if (result.isConfirmed) {
                this.route.navigate([`user/${this.userAcct.id}`]);
              }
            });
          }
        });

        console.log(response, 'CHECKING RES');

        console.log('CHECKING LOAN INFORMATION', this.loanInfo);
        // Handle the response from the server
      },

      (error) => {

 Swal.fire({
   title: 'Processing...',
   // html: 'Processing...',
   timer: 2000,
   timerProgressBar: true,
   showCancelButton: false,
   showConfirmButton: false,
   padding: '5em',
   willClose: () => {
     clearInterval(this.timerInterval);
   },
 }).then((result) => {
   /* Read more about handling dismissals below */
   if (result.dismiss === Swal.DismissReason.timer) {
     Swal.fire({
       title: 'Loan Disapproved',
       text: error.error,
       icon: 'error',
       iconColor: '#C31E39',
       // color: '#C31E39',
       backdrop: `
    #c31e3a3d
    left top
    no-repeat
  `,
       confirmButtonText: 'OK',
       confirmButtonColor: '#C31E39',
     });
   }
 });



        // this.toast.error({
        //   detail: error,
        //   summary: 'Please try again...',
        //   duration: 4000,
        // });
        console.error(error);
      }
    );
  }

  GetAcctById(id: any) {
    this.accountService.GetAccountById(id).subscribe({
      next: (data) => {
        this.acct = data;

        console.log(this.acct.fullName, 'TESTING USER INFO ---');
        return data;
      },
    });
  }

  logout() {}
}
