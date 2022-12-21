import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/Model/account';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
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
  };
  constructor(
    private route: Router,
    private accountService: AccountService,
    public activatedRoute: ActivatedRoute
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
      }
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
  GetAcctById(id: any) {
    this.accountService.GetAccountById(id).subscribe({
      next: (data) => {
        this.acct = data;

        console.log(this.acct.firstName, 'TESTING USER INFO ---');
        return data;
      },
    });
  }

  logout() {}
}
