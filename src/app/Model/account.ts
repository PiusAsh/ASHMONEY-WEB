export class Account {
  id!: number;
  fullName!: string;
  email!: string;
  phoneNumber!: number;
  country!: string;
  state!: string;
  address!: string;
  password!: string;
  gender!: string;
  dateOfBirth!: Date;
  accountNumber!: number;
  bankName!: string;
  accountBalance!: number;
  accountType!: string;
  transactionPin!: number;
  dateCreated!: Date;
  lastUpdated!: Date;
  lastLoggedIn!: Date;
  token!: string;
  eligibleLoanAmt!: string;
  role!: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}