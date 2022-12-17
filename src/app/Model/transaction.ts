export class bankTransferRequest {
beneficiaryAccount! :number;
senderAccount! : number;
amount!: number;
}
export class bankTransferResponse {
  transactionId!: number;
  transactionDate!: Date;
  referenceNumber!: string;
// Receiver's Name
beneficiary! : string;
beneficiaryAccount! : string;
senderAccount! : string;
  beneficiaryBankName! : string;
//Sender's Name
  sender!: string;
  status! : string;
  amount!: number;
  narration!: string;
  
}
