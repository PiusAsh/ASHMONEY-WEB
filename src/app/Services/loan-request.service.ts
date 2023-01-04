import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoanPayment, LoanRequestModel, LoanResponse } from '../Model/loan';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LoanRequestService {
  // baseApiUrl: string = 'https://localhost:44303';
  baseApiUrl: string = 'http://ashmoneyapi.somee.com';
  constructor(private http: HttpClient) {}

  sendLoanRequest(loanRequest: LoanRequestModel) {
    let queryParam: string = `?ClientId=${loanRequest.clientId}&Amount=${loanRequest.amount}&RepaymentPeriod=${loanRequest.repaymentPeriod}`;
    return this.http.post<LoanRequestModel>(
      this.baseApiUrl + '/LoanRequest' + queryParam,
      loanRequest
    );
  }

  makeLoanPayment(payment: LoanPayment): Observable<any> {
    let queryParam: string = `?LoanId=${payment.loanId}&Amount=${payment.amount}`;
    return this.http.post(
      this.baseApiUrl + '/MakeLoanPayment' + queryParam,
      payment
    );
  }

  GetLoanById(id: any): Observable<LoanResponse> {
    return this.http
      .get<LoanResponse>(`${this.baseApiUrl}/GetLoansByClient?clientId=` + id)
      .pipe(
        tap({
          next: (res) => {
            console.log('GETTING THE PRESENT USER ID', res);
          },
        })
      );
  }

  getLoansByBorrower() {
    return this.http.get<LoanResponse[]>(
      this.baseApiUrl + `/borrower/1111138626/loans`
      // this.baseApiUrl + `/borrower/${borrowerAccountNumber}/loans`
    );
  }
  // getLoansByBorrower(borrowerAccountNumber: number) {
  //   return this.http.get<LoanResponse[]>(
  //     this.baseApiUrl + `/borrower/1111098474/loans`
  //     // this.baseApiUrl + `/borrower/${borrowerAccountNumber}/loans`
  //   );
  // }
}
