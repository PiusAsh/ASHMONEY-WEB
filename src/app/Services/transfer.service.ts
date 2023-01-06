import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Account } from '../Model/account';
import { bankTransferRequest, bankTransferResponse } from '../Model/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  baseApiUrl: string = 'https://localhost:44303';
  // baseApiUrl: string = 'http://www.ashmoneyapi.somee.com';
  constructor(private http: HttpClient) {}
  BeneficiaryAccount!: number;
  SenderAccount!: number;
  Amount!: number;

  transfer(request: bankTransferRequest): Observable<bankTransferResponse> {
    let queryParam: string = `?BeneficiaryAccount=${request.beneficiaryAccount}&SenderAccount=${request.senderAccount}&Amount=${request.amount}`;
    return this.http
      .post<bankTransferResponse>(
        this.baseApiUrl + '/Transfer' + queryParam,
        request
      )
      .pipe(
        tap({
          next: (res) => {
            console.log(res, 'TESTING RESPONSE');
          },
        })
      );
  }

  GetAccountNumber(accountNumber: any): Observable<Account> {
    return this.http
      .get<Account>(
        `${this.baseApiUrl}/GetByAccountNo?accountNo=` + accountNumber
      )
      .pipe(
        tap({
          next: (res) => {
            console.log('GETTING THE PRESENT USER ACCOUNT', res);
          },
        })
      );
  }
}
