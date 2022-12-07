export interface Registration {
   id: 0;
  firstName: string ;
  lastName: string ;
  email: string ;
  phoneNumber: number;
  country: string;
  state: string;
  address: string;
  password: string;
  gender: string;
  dateOfBirth: Date;
  isAdmin: boolean;
  accountNumber: string;
  bankName: string;
  accountBalance: string;
  acctType: any;
  transactionPin: number;
  dateCreated:Date;
  lastUpdated: Date,
  lastLoggedIn: Date
}

export interface LoginResponse {
  Message: string;
  userData: string;
}

 