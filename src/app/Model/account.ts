export class Account {
       id!: number;
  firstName!: string ;
  lastName!: string ;
  email!: string ;
  phoneNumber!: number;
  country!: string;
  state!: string;
  address!: string;
  password!: string;
  gender!: string;
  dateOfBirth!: Date;
  isAdmin!: boolean;
  accountNumber!: string;
  bankName!: string;
  accountBalance!: string;
  acctType!: string;
  transactionPin!: number;
  dateCreated!:Date;
  lastUpdated!: Date;
  lastLoggedIn!: Date;
  token!: string;
  role!: string;

  
}

export interface IUserLogin {
  email: string;
  password: string;
}