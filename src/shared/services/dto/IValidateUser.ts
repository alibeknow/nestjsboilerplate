import type { CompanyType } from '../../../common/constants/company-type';
export interface IValidateSignature {
  bin: string;
  idn: string;
  companyType: CompanyType;
}
