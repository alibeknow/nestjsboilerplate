export interface IOwner {
  id: number;
  ownerType: string;
  xin: string;
  mobileNumber: string;
  email: string;
  address: string;
  companyName: string;
}

export interface IContent {
  accountType: string;
  accountNumber: string;
  balance: number;
  createdDate: Date;
  modifiedDate: Date;
  contractNumber: string;
  owner: IOwner;
  registrationDate: Date;
  expirationDate: Date;
  availableBalance: number;
}

export interface ISort {
  direction: string;
  property: string;
  ignoreCase: boolean;
  nullHandling: string;
  ascending: boolean;
  descending: boolean;
}

export interface ICreateIbanAccount {
  content: IContent[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  sort: ISort[];
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
}
