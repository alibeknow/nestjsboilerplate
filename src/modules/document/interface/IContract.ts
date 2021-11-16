export interface IDatum {
  text: string;
  operatorPosition: string;
  operatorFio: string;
  textContract: string;
  operatorDoc: string;
  companyName: string;
  userPosition: string;
  userFio: string;
  userDoc: string;
  legalAddress: string;
  factAddress: string;
  email: string;
  bin: string;
  iik: string;
  kbe: string;
  bik: string;
  bank: string;
  website: string;
  phone: string;
}

export interface IContractData {
  text: string;
  contractNumber: string;
  contractDate: string;
  data: IDatum[];
  operatorFio: string;
  operatorPosition: string;
  textContract: string;
}

export interface IContract {
  Contract: IContractData;
}
