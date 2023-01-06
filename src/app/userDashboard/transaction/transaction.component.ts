import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/Model/account';
import { LoanPayment } from 'src/app/Model/loan';
import { bankTransferResponse } from 'src/app/Model/transaction';
import { AccountService } from 'src/app/Services/account.service';
import { LoanRequestService } from 'src/app/Services/loan-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [CurrencyPipe, DatePipe],
})
export class TransactionComponent implements OnInit {
  trans: any;
  userName: any;
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
    eligibleLoanAmt: '',
  };

  transact: any;
  selectedCase = 'transaction';
  transactionPage = 1;
  loanPage = 1;
  userLoans: any;
  transactions!: bankTransferResponse[];
  accountNumber!: any;
  loans: any;
  lastLoggedInTime!: Date;
  repayForm!: FormGroup;

  amount!: number;
  formattedAmount: any;
  payLoan: any;
  timerInterval: any;
  loanRes: any;
  loanId: any;

  constructor(
    private route: Router,
    private accountService: AccountService,
    public activatedRoute: ActivatedRoute,
    private loanService: LoanRequestService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) {
    this.repayForm = new FormGroup({
      amount: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id: any = params.get('id');

      // alert(id);
      if (id) {
        this.accountService.GetAccountById(id).subscribe({
          next: (res) => {
            this.userAcct = res;
            console.log(this.userAcct, 'ACTIVATED ROUTE');
            this.GetUserTransaction(this.userAcct.accountNumber);
          },
        });

        this.loanService.GetLoanById(id).subscribe({
          next: (res) => {
            this.loans = res;
            // Calculate the difference in milliseconds
            const dueDate = this.loans.repaymentDate - this.loans.requestDate;
            //  alert(dueDate);
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

    this.accountService.getAllAccount().subscribe((data: any) => {
      this.acct = data;
      console.log(data, 'ALL ACCOUNTS ----');
    });

    this.accountService.getAllTransfer().subscribe((data: any) => {
      this.trans = data;
      console.log(data, 'ALL TRANSFER ----');
    });

    this.accountService.getAllAccount().subscribe((res: any) => {
      this.account = res;
      console.log(res, 'GETTING ALL USERS');
      console.log(this.account, 'GETTING ALL USERS');
    });
  }
  GetUserTransaction(accountNumber: any) {
    console.log(accountNumber);
    this.accountService
      .getUserTransaction(accountNumber)
      .subscribe((data: any) => {
        this.transact = data;
        console.log(data, 'FOR USERS*******');
      });
  }
  GetAcctById(id: any) {
    this.accountService.GetAccountById(id).subscribe({
      next: (data) => {
        this.acct = data;

        console.log(this.acct.firstName, 'TESTING USER INFO ---');
        return data;
      },
    });
  }

  print() {
    const prints: any = document.getElementById('staticBackdrop3')?.innerHTML;
    const original = document.body.innerHTML;
    document.body.innerHTML = prints;
    window.print();

    document.body.innerHTML = original;
  }
  prints() {
    const prints: any = document.getElementById('staticBackdrop')?.innerHTML;
    const original = document.body.innerHTML;
    document.body.innerHTML = prints;
    window.print();

    document.body.innerHTML = original;
  }
  close() {
    window.location.reload();
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

  formatAmount(event: any) {
    this.formattedAmount = this.currencyPipe.transform(
      this.amount,
      '₦',
      'symbol',
      '1.2-2'
    );
  }
  repayModal(payData: any, loanId: any) {
    this.loanId = loanId;
    const modal = document.getElementById('staticBackdrop5');
    if (modal) {
      const requestDateElement = modal.querySelector('.request-date');
      if (requestDateElement) {
        requestDateElement.textContent = this.datePipe.transform(
          payData.requestDate,
          'dd-MM-yyyy'
        );
      }
      const repaymentDateElement = modal.querySelector('.repayment-date');
      if (repaymentDateElement) {
        repaymentDateElement.textContent = this.datePipe.transform(
          payData.repaymentDate,
          'dd-MM-yyyy'
        );
      }
      const balanceDateElement = modal.querySelector('.money');
      if (balanceDateElement) {
        const loanBalance = payData.principal - payData.amountPaid;
        balanceDateElement.textContent = `₦${loanBalance}`;
        // this.datePipe.transform(`₦${loanBalance}`);
        // alert(loanBalance);
      }
    }
  }
  repayModalMobile(payData: any, loanId: any) {
    this.loanId = loanId;
    const modal = document.getElementById('staticBackdrop5Loan');
    if (modal) {
      const requestDateElement = modal.querySelector('.request-date');
      if (requestDateElement) {
        requestDateElement.textContent = this.datePipe.transform(
          payData.requestDate,
          'dd-MM-yyyy'
        );
      }
      const repaymentDateElement = modal.querySelector('.repayment-date');
      if (repaymentDateElement) {
        repaymentDateElement.textContent = this.datePipe.transform(
          payData.repaymentDate,
          'dd-MM-yyyy'
        );
      }
      const balanceDateElement = modal.querySelector('.money');
      if (balanceDateElement) {
        const loanBalance = payData.principal - payData.amountPaid;
        balanceDateElement.textContent = `₦${loanBalance}`;
        // this.datePipe.transform(`₦${loanBalance}`);
        // alert(loanBalance);
      }
    }
  }

  onMakePayment() {
    this.loanService.GetLoanById(this.loanId).subscribe((response) => {
      const payment: LoanPayment = {
        loanId: this.loanId,
        amount: this.repayForm.value.amount,
      };
      // alert(this.loanId);
      this.loanService.makeLoanPayment(payment).subscribe(
        (response) => {
          this.payLoan = response;
          Swal.fire({
            title: 'Processing...',
            // html: 'Processing...',
            timer: 4000,
            timerProgressBar: true,
            showCancelButton: false,
            showConfirmButton: false,
            padding: '7em',
            willClose: () => {
              clearInterval(this.timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              Swal.fire({
                title: 'Repayment Successful',
                text: `Your payment of ₦${payment.amount} has been received.`,
                icon: 'success',
                iconColor: '#008000',
                // color: '#C31E39',
                backdrop: `
    #c31e3a3d
    left top
    no-repeat
  `,
                // footer: 'Thank you for banking with us..',
                confirmButtonText: 'OK',
                confirmButtonColor: '#C31E39',
              }).then((result) => {
                if (result.isConfirmed) {
                  // this.route.navigate([`user/${this.userAcct.id}`]);
                  window.location.reload();
                  // this.route.navigate([`user/${this.userAcct.id}`]);
                }
              });
            }
          });

          console.log(response, 'CHECKING RES');
        },
        (error) => {
          Swal.fire({
            title: error.error,
            text: `Please try again...`,
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
          }).then((error) => {
            if (error.isConfirmed) {
              // this.route.navigate([`user/${this.userAcct.id}`]);
              window.location.reload();
              // this.route.navigate([`user/${this.userAcct.id}`]);
            }
          });
          console.error(error);
        }
      );
    });
  }

  signOut() {
    Swal.fire({
      title: 'Proceed to logout?',
      // text: 'You want to logout!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#c31e39',
      cancelButtonColor: 'swal2-cancel',
      // cancelButtonColor: '#cfd6df',
      // cancelButtonClass: 'my-custom-cancel-button-class',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.logout();
      }
    });
  }

  viewTransactionModal(rowData: any) {
    const modal = document.getElementById('staticBackdrop3');
    if (modal) {
      const requestDateElement = modal.querySelector('.transaction-date');
      if (requestDateElement) {
        requestDateElement.textContent = this.datePipe.transform(
          rowData.transactionDate,
          'dd-MM-yyyy'
        );
      }

      const repaymentDateElement = modal.querySelector('.reference-number');
      if (repaymentDateElement) {
        repaymentDateElement.textContent = rowData.referenceNumber;
      }
      const amountElement = modal.querySelector('.amount');
      if (amountElement) {
        amountElement.textContent = this.currencyPipe.transform(
          rowData.amount,
          '₦'
        );
        // rowData.amount;
      }

      const statusElement = modal.querySelector('.status');
      if (statusElement) {
        statusElement.textContent = rowData.status;
      }
      const senderElement = modal.querySelector('.sender');
      if (senderElement) {
        senderElement.textContent = rowData.sender;
      }
      const beneElement = modal.querySelector('.beneficiary');
      if (beneElement) {
        beneElement.textContent = rowData.beneficiary;
      }
      const beneBankElement = modal.querySelector('.beneficiary-bank');
      if (beneBankElement) {
        beneBankElement.textContent = rowData.beneficiaryBankName;
      }

      // Show the modal
      modal.classList.add('show');
    }
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
          rowData.repaymentDate,
          'dd-MM-yyyy'
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
      }

      const statusElement = modal.querySelector('.status');
      if (statusElement) {
        statusElement.textContent = rowData.status;
      }

      // Show the modal
      modal.classList.add('show');
    }
  }
  viewModalMobile(rowData: any) {
    const modal = document.getElementById('staticBackdropLoanMobile');
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
          rowData.repaymentDate,
          'dd-MM-yyyy'
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
