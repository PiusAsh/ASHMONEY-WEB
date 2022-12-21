import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoanRequestModel } from '../Model/loan';


@Injectable({
  providedIn: 'root',
})
export class LoanRequestService {
  baseApiUrl: string = 'https://localhost:44303';
  constructor(private http: HttpClient) {}

  sendLoanRequest(loanRequest: LoanRequestModel) {
    let queryParam: string = `?ClientId=${loanRequest.clientId}&Amount=${loanRequest.amount}&RepaymentPeriod=${loanRequest.repaymentPeriod}`;
    return this.http.post<LoanRequestModel>(this.baseApiUrl +
      '/LoanRequest' + queryParam,
      loanRequest
    );
  }
}
