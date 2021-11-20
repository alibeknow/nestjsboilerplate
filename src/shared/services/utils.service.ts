import { Injectable } from '@nestjs/common';

import { CompanyType } from '../../common/constants/company-type';
import type { UserRegisterXmlDto } from '../../modules/auth/dto/UserRegisterXmlDto';
import type { IVerificationSignature } from '../../modules/signature/interfaces/IVerificationSignature';
import type { IValidateSignature } from './dto/IValidateUser';

@Injectable()
export class UtilsService {
  validateSignature(
    signatureData: IVerificationSignature,
    signatureDto: IValidateSignature,
  ) {
    const { idn, companyType, bin } = signatureDto;
    if (companyType === CompanyType.IE) {
      return signatureData.valid &&
        signatureData.subject.iin === idn &&
        !signatureData.subject.bin
        ? true
        : false;
    }
    return signatureData.valid &&
      signatureData.subject.bin &&
      signatureData.subject.bin === bin &&
      signatureData.subject.iin === idn
      ? true
      : false;
  }
}
