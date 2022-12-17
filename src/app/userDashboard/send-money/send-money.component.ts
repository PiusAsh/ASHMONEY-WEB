import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Account } from 'src/app/Model/account';
import { bankTransferRequest, bankTransferResponse } from 'src/app/Model/transaction';
import { AccountService } from 'src/app/Services/account.service';
import { TransferService } from 'src/app/Services/transfer.service';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css'],
})
export class SendMoneyComponent implements OnInit {
  user: any;

  userAcct: Account = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: 0,
    country: '',
    state: '',
    address: '',
    password: '',
    gender: '',
    dateOfBirth: new Date(),
    isAdmin: false,
    accountNumber: '',
    bankName: '',
    accountBalance: '',
    acctType: '',
    transactionPin: 0,
    dateCreated: new Date(),
    lastUpdated: new Date(),
    lastLoggedIn: new Date(),
    token: '',
    role: '',
  };
  TransferResponse: bankTransferResponse = new bankTransferResponse();
  TransferResponseee: bankTransferResponse = {
    transactionId: 0,
    transactionDate: new Date(),
    referenceNumber: '',
    beneficiary: '',
    beneficiaryAccount: '',
    senderAccount: '',
    beneficiaryBankName: '',
    sender: '',
    status: '',
    amount: 0,
    narration: '',
  };

  TransferReq: bankTransferRequest = {
    beneficiaryAccount: 0,
    senderAccount: 0,
    amount: 0,
  };
  senderAccount!: number;
  beneficiaryAccount!: number;
  amount!: number;

  request: bankTransferRequest = {
    senderAccount: this.senderAccount,
    beneficiaryAccount: this.beneficiaryAccount,
    amount: this.amount,
  };
  requestTrf = {
    senderAccount: this.senderAccount,
    beneficiaryAccount: this.beneficiaryAccount,
    amount: this.amount,
  };
  transferForm!: FormGroup;
  res: any;
  acct: any;

  accountNumber!: number;
  AccountUser: any;
  error!: string;
  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private transferService: TransferService,
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private toast: NgToastService
  ) {
    this.transferForm = new FormGroup({
      senderAccount: new FormControl(''),
      beneficiaryAccount: new FormControl(''),
      amount: new FormControl(''),
      sender: new FormControl(''),
      narration: new FormControl(''),
      beneficiary: new FormControl(''),
      beneficiaryBankName: new FormControl(''),
    });
    // this.transferForm = this.fb.group({
    //   acctType: [''],
    //   beneficiary: [''],
    //   beneficiaryAccount: [''],
    //   sender: [''],
    //   senderAccount: [''],
    //   amount: [''],
    //   narration: [''],
    //   beneficiaryBankName: [''],
    // });
  }

  ngOnInit(): void {
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
  }




  

  // /Transfer?BeneficiaryAccount=1111399171&SenderAccount=1111310496&Amount=1300' \
  //  queryParam = `?BeneficiaryAccount=${BeneficiaryAccount}&SenderAccount=${SenderAccount}&Amount=Amount`;
  transfer() {
    const formValues = this.transferForm.value;
   const senderAccount = formValues.senderAccount;
   const beneficiaryAccount = formValues.beneficiaryAccount;
   const amount = formValues.amount;
    const request3 = new bankTransferRequest();
    this.transferService.transfer(request3).subscribe(
      (response) => {
        this.TransferResponse = response;
        console.log(response, 'CHECKING RES');
        alert(this.transferForm.value);
      },
      (error) => {
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
    if (accountNumber.length !== 10 || accountNumber.length > 10) {
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
}
