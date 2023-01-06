import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Account } from 'src/app/Model/account';
import { AccountService } from 'src/app/Services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receive-money',
  templateUrl: './receive-money.component.html',
  styleUrls: ['./receive-money.component.css'],
})
export class ReceiveMoneyComponent implements OnInit {
  userAcct: Account = {
    id: 0,
    fullName: '',
    email: '',
    eligibleLoanAmt: '',
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
  acct: any;
  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private toast: NgToastService
  ) {}
  @ViewChild('hiddenTextarea', { static: false })
  hiddenTextarea!: ElementRef;
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

  copyToClipboard(element: any) {
    // Set the value of the hidden textarea to the text of the element
    this.hiddenTextarea.nativeElement.value = element.innerText;

    // Select the text in the textarea
    this.hiddenTextarea.nativeElement.select();

    // Copy the text to the clipboard
    document.execCommand('copy');
    this.toast.success({
      detail: 'Account number copied!',
      duration: 3000,
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
}
