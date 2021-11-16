export interface IDatum {
  text: string;
  operatorData: string;
  textContract: string;
  operatorDoc: string;
  clientName: string;
  userPosition: string;
  userFio: string;
  userDoc: string;
  legalAddress: string;
  factAddress: string;
  emailUser: string;
  bin: string;
  iik: string;
  kbe: string;
  bik: string;
  bankUser: string;
  siteUser: string;
  telUser: string;
}

export interface IContractData {
  text: string;
  number: string;
  dateContract: string;
  data: IDatum[];
  operatorData: string;
  textContract: string;
}

export interface IContract {
  Contract: IContractData;
}
