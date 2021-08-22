export interface IIssuer {
  commonName: string;
  country: string;
  dn: string;
  organization: string;
}

export interface IChain {
  valid: boolean;
  notAfter: string;
  keyUsage: string;
  serialNumber: string;
  subject: ISubject;
  signAlg: string;
  sign: string;
  publicKey: string;
  issuer: IIssuer;
  notBefore: string;
  keyUser: string[];
}
export interface ISubject {
  lastName: string;
  country: string;
  commonName: string;
  gender: string;
  bin: string;
  surname: string;
  organization: string;
  dn: string;
  birthDate: string;
  email: string;
  iin: string;
}
export interface ICert {
  valid: boolean;
  notAfter: string;
  chain: IChain[];
  keyUsage: string;
  serialNumber: string;
  subject: ISubject;
  signAlg: string;
  sign: string;
  publicKey: string;
  issuer: IIssuer;
  notBefore: string;
  keyUser: string[];
}

export interface IResult {
  valid: boolean;
  cert: ICert;
}

export interface ISignature {
  result: IResult;
  message: string;
  status: number;
}
