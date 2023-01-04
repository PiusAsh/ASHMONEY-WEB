export class LoanRequestModel {
  clientId!: number;
  amount!: number;
  repaymentPeriod!: number;
}
export interface LoanResponse {
  loanId: number;
  borrowerAccount: number;
  borrowerName: string;
  amount: number;
  principal: number;
  interestRate: number;
  repaymentPeriod: number;
  repaymentDate: Date;
  requestDate: Date;
  status: string;
}
export interface LoanPayment {
  loanId: number;
  amount: number;
}

