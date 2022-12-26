import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/Model/account';
import { bankTransferResponse } from 'src/app/Model/transaction';
import { AccountService } from 'src/app/Services/account.service';
import { LoanRequestService } from 'src/app/Services/loan-request.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  myDate = Date.now();
  user: any;
  acct: any;
  account: any[] = [];
  userAcct: Account = {
    id: 0,
    fullName: '',
    email: '',
    phoneNumber: 0,
    country: '',
    state: '',
    address: '',
    password: '',
    gender: '',
    dateOfBirth: new Date(),
    accountNumber: 0,
    bankName: '',
    accountBalance: 0,
    accountType: '',
    transactionPin: 0,
    dateCreated: new Date(),
    lastUpdated: new Date(),
    lastLoggedIn: new Date(),
    token: '',
    role: '',
  };
  userInformation: any;
  transact: any;
  selectedCase = 'transaction';
  trans = [];
  p = 1;
  userLoans: any;
  userName: any;
  transactions!: bankTransferResponse[];
  accountNumber!: any;
  loans: any;

  constructor(
    private route: Router,
    private accountService: AccountService,
    public activatedRoute: ActivatedRoute,
    private loanService: LoanRequestService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id: any = params.get('id');

      // alert(id);
      if (id) {
        this.accountService.GetAccountById(id).subscribe({
          next: (res) => {
            this.userAcct = res;
            console.log(this.userAcct, 'ACTIVATED ROUTE');
          },
        });
        this.loanService.GetLoanById(id).subscribe({
          next: (res) => {
            this.loans = res;
            console.log(this.loans, 'CHECKING USER LOAN');
          },
        });
        this.accountService
          .getUserTransaction(this.userAcct.accountNumber)
          .subscribe((transact) => {
            this.transactions = transact;
            console.log(this.userAcct.accountNumber, '************** ACCT');
            console.log(transact, '************** TRANSACTIONS');
          });
        this.loanService.getLoansByBorrower().subscribe((loans) => {
          this.userLoans = loans;
          // Calculate the due date based on the repayment period
          console.log(loans, 'CHECKING USER LOAN');
          console.log('CHECKING LOANS', this.userLoans);
        });
      }
    });

    this.accountService
      .getUserTransaction(this.userAcct.accountNumber)
      .subscribe((data: any) => {
        this.transact = data;
        console.log(data, 'FOR USERS*******');
      });

    // this.accountService.getAllAccount().subscribe((res: any) => {
    //   this.account = res;
    //   console.log(res, 'GETTING ALL USERS');
    //   console.log(this.account, 'GETTING ALL USERS');
    // });
  }

  print() {
    const prints: any = document.getElementById('staticBackdrop')?.innerHTML;
    const original = document.body.innerHTML;
    document.body.innerHTML = prints;
    window.print();

    document.body.innerHTML = original;
  }
  close() {
    window.location.reload();
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
  GetUserLoanById(id: any) {
    this.loanService.GetLoanById(id).subscribe({
      next: (data) => {
        this.loans = data;

        console.log(this.loans, 'LOANS ---');
        return data;
      },
    });
  }

  logout() {
    this.accountService.logout();
  }



  viewModal(rowData: any) {
    // Get a reference to the modal element
    const modal = document.getElementById('staticBackdrop');

    // Check if the modal element was found
    if (modal) {
      // Set the values of the modal's elements to the data from the row
      const requestDateElement = modal.querySelector('.request-date');
      if (requestDateElement) {
        requestDateElement.textContent = rowData.requestDate;
      }

      const repaymentDateElement = modal.querySelector('.repayment-date');
      if (repaymentDateElement) {
        repaymentDateElement.textContent = rowData.repaymentDate;
      }

      const amountElement = modal.querySelector('.amount');
      if (amountElement) {
        amountElement.textContent = rowData.amount;
        
      }

      const principalElement = modal.querySelector('.principal');
      if (principalElement) {
        principalElement.textContent = rowData.principal;
      }

      const amountPaidElement = modal.querySelector('.amount-paid');
      if (amountPaidElement) {
        amountPaidElement.textContent = rowData.amountPaid;
      }

      const statusElement = modal.querySelector('.status');
      if (statusElement) {
        statusElement.textContent = rowData.status;
      }

      // Show the modal
      modal.classList.add('show');
    }
  
}


}
