import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Account, IUserLogin } from '../Model/account';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { bankTransferResponse } from '../Model/transaction';
import { UrlEncrypt } from '../Helper/encrypt';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  user: any;
  admin: any;
  public UserKey: string = 'User Account';
  baseApiUrl: string = 'http://testingapi.runasp.net/api/';
  // http://testingapi.runasp.net/swagger/index.html
  // baseApiUrl: string = 'http://www.ashmoneyapi.somee.com/api/';

  private userSubject = new BehaviorSubject<Account>(
    this.getUserFromLocalStorage()
  );
  public userObservable!: Observable<Account>;
  res: any;
  userDetails: any;
  isAdmin: any;
  public keys: string = '1234567890';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService,
    private urlEncrypt: UrlEncrypt,
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  // CHECKOUT FUNCTION FOR CURRENT USER
  public get currentUser(): Account {
    return this.userSubject.value;
  }

  // IsAdmin() {
  //   this.admin = localStorage.getItem(this.UserKey);
  //   this.isAdmin = JSON.parse(this.admin.role == true);

  //   return this.admin;
  // }

  IsLoggedIn() {
    return localStorage.getItem(this.UserKey)?.toString();
  }
  getAllAccountQ(): Observable<Account[]> {
    return this.http
      .get<Account[]>(this.baseApiUrl + 'Account/GetAllAccounts')
      .pipe(
        tap({
          next: (res) => {
            this.user = res;
            console.log(this.user.user, 'CHECKING ALL ACCOUNT');
          },
        })
      );
  }
  getAllAccount(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseApiUrl + 'Account/GetAllAccounts');
  }
  getAllTransfer(): Observable<bankTransferResponse[]> {
    return this.http.get<bankTransferResponse[]>(
      this.baseApiUrl + 'Account/GetAllTransfer'
    );
  }
  getUserTransactionss(accountNumber: any): Observable<bankTransferResponse[]> {
    return this.http
      .get<bankTransferResponse[]>(
        `http://testingapi.runasp.net/GetUserTransaction?accountNumber=${accountNumber}`
        // 'https://localhost:44303/GetUserTransaction?accountNumber=1111138626'
      )
      .pipe(
        tap({
          next: (res) => {
            console.log('GETTING USER TRANSACTIONS', res);
          },
        })
      );
  }

  getUserTransactions(accountNumber: any) {
    return this.http.get<bankTransferResponse[]>(
      'http://testingapi.runasp.net/GetUserTransaction',
      {
        params: {
          accountNumber: this.user.accountNumber,
        },
      }
    );
  }

  getUserTransaction(accountNumber: any): Observable<bankTransferResponse[]> {
    const params = new HttpParams().set('accountNumber', accountNumber);
    return this.http.get<bankTransferResponse[]>(
      'http://testingapi.runasp.net/GetUserTransaction',
      // 'http://www.ashmoneyapi.somee.com/GetUserTransaction',
      {
        params,
      }
    );
  }

  updateUser(id: any, update: Account): Observable<Account> {
    return this.http.put<Account>(
      this.baseApiUrl + 'Account/UpdateAccount?Id=' + id,
      update
    );
  }

  logout() {
    localStorage.removeItem(this.UserKey);
    this.toast.info({
      detail: 'Logout Successful',
      summary: 'Please login to continue',
    });
    this.router.navigate(['login']);
  }

  getAllTransfers(): Observable<bankTransferResponse[]> {
    return this.http.get<bankTransferResponse[]>(
      // 'http://www.ashmoneyapi.somee.com/GetAllTransfer'
      'http://testingapi.runasp.net/GetAllTransfer'
    );
  }

  LoginUser(login: any): Observable<Account> {
    return this.http
      .post<Account>(`http://testingapi.runasp.net/api/Account/Login`, login)
      .pipe(
        tap({
          next: (res: any) => {
            this.user = res.data;
            this.userSubject.next(res.data);
            this.setUserLocalStorage(res.data);
            console.log('GETTING THE PRESENT USE ***R', this.user);

            // this.GetAccountById(this.user.user.id).subscribe({
            //   next: (res) => {
            //     this.userDetails = res;
            //   },
            // });
            // let _enUrl = this.urlEncrypt.encrypt(this.user.user.id);
            this.router.navigate([`user/${this.user.id}`]);
            this.toast.success({
              detail: `Hey, ${this.user.fullName}`,
              summary: 'Welcome back!',
              duration: 5000,
            });
          },
          error: (err) => {
            this.toast.error({
              detail: 'Something went wrong',
              summary: 'Please check your details and internet',
              duration: 7000,
            });
            return err;
          },
        })
      );
  }
  RegisterUser(reg: any): Observable<Account> {
    return this.http
      .post<Account>(`${this.baseApiUrl}Account/OpenAccount`, reg)
      .pipe(
        tap({
          next: (res) => {
            this.toast.success({
              detail: 'Registered Successfully',
              summary: 'Thank you for banking with us!',
              duration: 5000,
            });
            this.router.navigate(['login']);
            return res;
          },
          error: (err) => {
            this.toast.error({
              detail: 'Oops!!',
              summary: 'Error Occurred: ' + err.error.message,
              duration: 4000,
            });
            console.log(err, 'checking-----');
            return err;
          },
        })
      );
  }

  GetAccountById(id: any): Observable<Account> {
    return this.http
      .get<Account>(`${this.baseApiUrl}Account/GetAccountById?Id=` + id)
      .pipe(
        tap({
          next: (res) => {
            console.log('GETTING THE PRESENT USER ID', res);
          },
        })
      );
  }

  private setUserLocalStorage(user: Account) {
    localStorage.setItem(this.UserKey, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): Account {
    const userJson = localStorage.getItem(this.UserKey);
    if (userJson) return JSON.parse(userJson) as Account;
    return new Account();
  }
}
