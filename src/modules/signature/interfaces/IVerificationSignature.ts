import type { IResult, ISubject } from './IResponseSignature';
export interface IVerificationSignature {
  valid: boolean;
  subject: ISubject;
}
