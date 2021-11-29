export interface IAnswer {
  accountNumber?: string;
}

export interface ICreateIbanAccount {
  success: boolean;
  answer: IAnswer;
}
