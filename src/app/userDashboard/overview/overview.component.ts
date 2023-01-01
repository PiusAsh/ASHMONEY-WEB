import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/Model/account';
import { bankTransferResponse } from 'src/app/Model/transaction';
import { AccountService } from 'src/app/Services/account.service';
import { LoanRequestService } from 'src/app/Services/loan-request.service';
import Swal from 'sweetalert2';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [CurrencyPipe, DatePipe],
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
  mainTrans: any;
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
  lastLoggedInTime!: Date;
  dueDate!: Date;
  today = Date.now();
  repayForm: any;
  amount!: number;
  formattedAmount: any;

  constructor(
    private route: Router,
    private accountService: AccountService,
    public activatedRoute: ActivatedRoute,
    private loanService: LoanRequestService, private currencyPipe: CurrencyPipe, private datePipe: DatePipe
  ) // private modalService: NgbModal
  {
    this.repayForm = new FormGroup({
      amount: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    
    let accountNumber = 0;
    this.activatedRoute.paramMap.subscribe((params) => {
      const id: any = params.get('id');

      // alert(id);
      if (id) {
        this.accountService.GetAccountById(id).subscribe({
          next: (res) => {
            this.userAcct = res;
            accountNumber = this.userAcct.accountNumber;
            console.log(this.userAcct, 'ACTIVATED ROUTE');
            console.log(accountNumber, 'CHEC-----');
            this.GetUserTransaction(accountNumber);
          },
        });

        this.loanService.GetLoanById(id).subscribe({
          next: (res) => {
            this.loans = res;

            const dueDate = new Date().setMonth(
              new Date().getMonth() + this.loans.repaymentPeriod
            );

            const currentDate = new Date();
            const loanDueDate = new Date();
            loanDueDate.setTime(this.loans.repaymentDate);

            if (currentDate.getTime() > loanDueDate.getTime()) {
              this.loans.status = 'Due';
              // Show an alert to the user indicating that their loan is due
              alert(
                'Your loan is due. Please make a payment as soon as possible.'
              );
            }
          },
        });
      }
    });
  }

  async GetUserTransaction(accountNumber: any) {
    console.log(accountNumber);
    await this.accountService
      .getUserTransaction(accountNumber)
      .subscribe((data: any) => {
        this.transact = data;
        console.log(data, 'FOR USERS*******');
      });
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

  signOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.logout();
      }
    });
  }

  formatAmount(event: any) {
    this.formattedAmount = this.currencyPipe.transform(
      this.amount,
      '₦',
      'symbol',
      '1.2-2'
    );
  }

  viewModal(rowData: any) {
    const modal = document.getElementById('staticBackdrop');
    if (modal) {
      const requestDateElement = modal.querySelector('.request-date');
      if (requestDateElement) {
        requestDateElement.textContent = this.datePipe.transform(
          rowData.requestDate,
          'dd-MM-yyyy'
        );
      }

      const repaymentDateElement = modal.querySelector('.repayment-date');
      if (repaymentDateElement) {
        repaymentDateElement.textContent = this.datePipe.transform(
          rowData.repaymentDate, 'dd-MM-yyyy'
        );
        
      }
      const amountElement = modal.querySelector('.amount');
      if (amountElement) {
        amountElement.textContent = this.currencyPipe.transform(
          rowData.amount,
          '₦'
        );
        // rowData.amount;
      }
      const principalElement = modal.querySelector('.principal');
      if (principalElement) {
        principalElement.textContent = this.currencyPipe.transform(
          rowData.principal,
          '₦'
        );
      }

      const amountPaidElement = modal.querySelector('.amount-paid');
      if (amountPaidElement) {
        amountPaidElement.textContent = this.currencyPipe.transform(
          rowData.amountPaid,
          '₦'
        );
        ;
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
