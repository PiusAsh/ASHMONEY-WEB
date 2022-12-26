export class bankTransferRequest {
beneficiaryAccount! :number;
senderAccount! : number;
amount!: number;
}
export class bankTransferResponse {
  transactionId!: number;
  transactionDate!: Date;
  referenceNumber!: string;
beneficiary! : string;
beneficiaryAccount! : string;
senderAccount! : string;
  beneficiaryBankName! : string;
  sender!: string;
  status! : string;
  amount!: number;
  narration!: string;
  type!: string;
  
}
