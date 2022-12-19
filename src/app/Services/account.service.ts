import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account, IUserLogin } from '../Model/account';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { bankTransferResponse } from '../Model/transaction';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  user: any;
  public UserKey: string = 'User Account';
  // baseApiUrl: string = 'https://localhost:44370/api/';
  baseApiUrl: string = 'https://localhost:44303/api/';

  private userSubject = new BehaviorSubject<Account>(
    this.getUserFromLocalStorage()
  );
  public userObservable!: Observable<Account>;
  res: any;
  userDetails: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  // CHECKOUT FUNCTION FOR CURRENT USER
  public get currentUser(): Account {
    return this.userSubject.value;
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
  

  LoginUser(login: any): Observable<Account> {
    return this.http
      .post<Account>(`${this.baseApiUrl}Account/Auth`, login)
      .pipe(
        tap({
          next: (res) => {
            this.user = res;
            this.userSubject.next(res);
            this.setUserLocalStorage(res);
            console.log('GETTING THE PRESENT USE ***R', this.user.user);

            this.GetAccountById(this.user.user.id).subscribe({
              next: (res) => {
                this.userDetails = res;
              },
            });

            this.router.navigate([`user/${this.user.user.id}`]);
            this.toast.success({
              detail: `Hey, ${this.user.user.fullName}`,
              summary: 'Welcome back!',
              duration: 5000,
            });
          },
          error: (err) => {
            this.toast.error({
              detail: err.error.message,
              summary: 'Please try again',
              duration: 4000,
            });
            return err;
          },
        })
      );
  }
  RegisterUser(reg: any): Observable<Account> {
    return this.http
      .post<Account>(`${this.baseApiUrl}Account/Signup`, reg)
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
              detail: err.error.message,
              summary: 'Please try again later!',
              duration: 4000,
            });
            return err;
          },
        })
      );
  }
  // getUserById(id: any): Observable<Account> {
  //   return this.http
  //     .get<Account>(this.baseApiUrl + 'Account/GetUserById?Id=' + id)
  //     .pipe(
  //       map((data) => {
  //         return data;
  //       })
  //     );
  // }
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
