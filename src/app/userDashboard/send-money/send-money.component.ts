import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Account } from 'src/app/Model/account';
import { bankTransferRequest, bankTransferResponse } from 'src/app/Model/transaction';
import { AccountService } from 'src/app/Services/account.service';
import { TransferService } from 'src/app/Services/transfer.service';
import Swal from 'sweetalert2';

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

  
  senderAccount!: number;
  beneficiaryAccount!: number;
  amount!: number;


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
    private toast: NgToastService, private route: Router
  ) {
    this.transferForm = new FormGroup({
      senderAccount: new FormControl('', Validators.required),
      beneficiaryAccount: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      sender: new FormControl('', Validators.required),
      narration: new FormControl('', Validators.required),
      beneficiary: new FormControl('', Validators.required),
      beneficiaryBankName: new FormControl('', Validators.required),
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

  trf(){
    console.log(this.transferForm.value, 'CHECKING FORM SENDER VALUE');
  }

  // /Transfer?BeneficiaryAccount=1111399171&SenderAccount=1111310496&Amount=1300' \
  //  queryParam = `?BeneficiaryAccount=${BeneficiaryAccount}&SenderAccount=${SenderAccount}&Amount=Amount`;
  transfer() {
    if(this.transferForm){
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
          confirmButtonText: 'OK',
          confirmButtonColor: '#C31E39',
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate([`user/${this.userAcct.id}`]);
          }
        });
        
        console.log(response, 'CHECKING RES');
       
        
      },
      (error) => {
        this.toast.error({
          detail: error, summary: "Please try again...", duration:4000
        })
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
