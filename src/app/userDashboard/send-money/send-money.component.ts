import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Account } from 'src/app/Model/account';
import { bankTransferRequest, bankTransferResponse } from 'src/app/Model/transaction';
import { AccountService } from 'src/app/Services/account.service';
import { TransferService } from 'src/app/Services/transfer.service';
import Swal from 'sweetalert2';
// import * as crypto from 'crypto';
import { SHA256 } from 'crypto-js';





@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css'],
})
export class SendMoneyComponent implements OnInit {
  user: any;

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
  TransferResponse: bankTransferResponse = new bankTransferResponse();
  TransferResponseee: bankTransferResponse = {
    transactionId: 0,
    transactionDate: new Date(),
    referenceNumber: '',
    beneficiary: '',
    type: '',
    beneficiaryAccount: '',
    senderAccount: '',
    beneficiaryBankName: '',
    sender: '',
    status: '',
    amount: 0,
    narration: '',
  };
  hashedPin: any;
  senderAccount!: number;
  beneficiaryAccount!: number;
  amount!: number;

  transferForm!: FormGroup;
  res: any;
  acct: any;
  TransferPIN: any;

  accountNumber!: number;
  AccountUser: any;
  error!: string;
  timerInterval: any;
  sendMoneyForm!: FormGroup;
  incorrectPin = false;
  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private transferService: TransferService,
    private fb: FormBuilder,
    private toast: NgToastService,
    private route: Router
  ) {
    this.TransferPIN = this.userAcct.transactionPin;
    this.transferForm = new FormGroup({
      senderAccount: new FormControl(''),
      beneficiaryAccount: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      sender: new FormControl(''),
      narration: new FormControl('', Validators.required),
      beneficiary: new FormControl(''),
      beneficiaryBankName: new FormControl(''),
      acctType: new FormControl(''),
    });

    this.sendMoneyForm = new FormGroup({
      pin: new FormControl('', [Validators.required, Validators.maxLength(4)]),
    });
  }

  // async encryptId(id: any) {
  //   const cipher = crypto.createCipher('aes-256-cbc', 'secret-key');
  //   let encryptedId = cipher.update(id, 'utf8', 'hex');
  //   encryptedId += cipher.final('hex');

  //   this.encryptId(this.userAcct.id);
  //   this.route.navigate(['/route', encryptedId]);
  // }

  ngOnInit(): void {
    // this.router.navigate(['user/', encryptedId]);
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
      }
    });
    this.reset();
  }
  reset() {
    this.sendMoneyForm.reset();
    this.incorrectPin = false;
    this.hashedPin = null;
  }

  trf() {
    console.log(this.transferForm.value, 'CHECKING FORM SENDER VALUE');
  }

  // /Transfer?BeneficiaryAccount=1111399171&SenderAccount=1111310496&Amount=1300' \
  //  queryParam = `?BeneficiaryAccount=${BeneficiaryAccount}&SenderAccount=${SenderAccount}&Amount=Amount`;

  // const id: any = this.sendMoneyForm.get('id');
  resetIncorrectPin() {
    this.incorrectPin = false;
  }
  post() {
    if (this.sendMoneyForm.value.pin !== this.userAcct.transactionPin) {
      this.incorrectPin = true;
      return false;
    } else {
      this.incorrectPin = false;
      this.transfer();
      return true;
    }
  }

  transfer() {
    if (this.transferForm) {
      this.TransferResponse.sender = this.transferForm.value.sender;
      this.TransferResponse.beneficiary = this.transferForm.value.beneficiary;
      this.TransferResponse.narration = this.transferForm.value.narration;
      this.TransferResponse.beneficiaryBankName =
        this.transferForm.value.beneficiaryBankName;
    }
    console.log(this.transferForm.value, 'CHECKING FORM SENDER VALUE');
    const request: bankTransferRequest = {
      senderAccount: this.transferForm.value.senderAccount,
      beneficiaryAccount: this.transferForm.value.beneficiaryAccount,
      amount: this.transferForm.value.amount,
    };
    // console.log(request.senderAccount, "888888")
    this.transferService.transfer(request).subscribe(
      (response) => {
        this.TransferResponse = response;

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
              title: 'Transfer Successful',
              text: `You just sent ₦${response.amount} to ${response.beneficiary}`,
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
            })
              .then((result) => {
                if (result.isConfirmed) {
                  this.route.navigate([`user/${this.userAcct.id}`]);
                  window.location.reload();
                  // this.route.navigate([`user/${this.userAcct.id}`]);
                }
              })
              .then((result) => {
                this.route.navigate([`user/${this.userAcct.id}`]);
                window.location.reload();
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
        });
        console.error(error);
      }
    );
  }

  GetAcctById(id: any) {
    this.accountService.GetAccountById(id).subscribe({
      next: (data) => {
        this.userAcct = data;
        alert(this.userAcct.accountNumber);
        console.log(this.acct, 'TESTING USER INFO ---');
        return data;
      },
    });
  }

  validateAccountNumber(accountNumber: string) {
    if (
      !accountNumber ||
      accountNumber.length !== 10 ||
      accountNumber.length > 10
    ) {
      this.AccountUser = '';
      return;
    }
    this.transferService.GetAccountNumber(this.accountNumber).subscribe(
      (response) => {
        this.AccountUser = response;
        this.toast.success({
          detail: 'Account Confirmed',
          summary: 'You can Initiate this Transfer now',
        });
      },
      (error) => {
        this.error = 'Invalid Account Number';
        this.toast.error({
          detail: this.error,
          summary: 'Enter a Valid Account Number',
        });
        this.user = null;
      }
    );
  }

  hashPin(pin: any): any {
    return SHA256(pin);
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
}


