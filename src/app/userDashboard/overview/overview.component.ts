import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Account } from 'src/app/Model/account';
import { LoanPayment } from 'src/app/Model/loan';
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
    eligibleLoanAmt: '',
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
  loanPage = 1;
  transactionPage = 1;
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
  payLoan: any;
  timerInterval: any;
  loanRes: any;
  loanId: any;
  searchText: any;

  constructor(
    private route: Router,
    private accountService: AccountService,
    public activatedRoute: ActivatedRoute,
    private loanService: LoanRequestService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe, private toast: NgToastService // private modalService: NgbModal
  ) {
    this.repayForm = new FormGroup({
      amount: new FormControl('', [Validators.required]),
    });
  }
  @ViewChild('hiddenTextarea', { static: false })
  hiddenTextarea!: ElementRef;
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

  GetUserTransaction(accountNumber: any) {
    console.log(accountNumber);
   this.accountService
      .getUserTransaction(accountNumber)
      .subscribe((data: any) => {
        this.transact = data;
        console.log(data, 'FOR USERS*******');
      });
  }

  toggler() {
    const toggleButtons = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    toggleButtons!.addEventListener('click', function () {
      navbarCollapse!.classList.toggle('collapse');
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
        // this.onMakePayment(this.loans.loanId)
        alert(this.loans.loanId);

        console.log(this.loans, 'LOANS ---');
        return data;
      },
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

  copyToClipboard(element: any) {
    // Set the value of the hidden textarea to the text of the element
    this.hiddenTextarea.nativeElement.value = element.innerText;

    // Select the text in the textarea
    this.hiddenTextarea.nativeElement.select();

    // Copy the text to the clipboard
    document.execCommand('copy');
    this.toast.success({
      detail: 'Account number copied!', duration: 3000
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

  onMakePaymentr() {
    this.loanService.GetLoanById(this.loanId).subscribe((response) => {
      const payment: LoanPayment = {
        loanId: response.loanId,
        amount: this.repayForm.value.amount,
      };
      this.loanService.makeLoanPayment(payment).subscribe((response) => {
        this.payLoan = response;
        console.log(this.payLoan, 'CHECKING----');
      });
    });
  }

  repayModal(payData: any, loanId: any) {
    this.loanId = loanId;
    const modal = document.getElementById('staticBackdrop5'); // fixed modal ID
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
      }
    }
  }
  repayModalMobile(payData: any, loanId: any) {
    this.loanId = loanId;
    const modal = document.getElementById('staticBackdrop5mobile'); // fixed modal ID
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
    const modal = document.getElementById('staticBackdropmobile');
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
  viewTransactionModalMobile(rowData: any) {
    const modal = document.getElementById('staticBackdrop3mobile');
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
}
