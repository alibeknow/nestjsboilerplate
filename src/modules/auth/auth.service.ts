import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { NotValidCertException } from '../../exceptions/not-valid-cert.eception';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { CompanyService } from '../company/company.service';
import type { CompanyDto } from '../company/dto/company-dto';
import type { CreateCompanyDto } from '../company/dto/createCompany.dto';
import type { SignatureDto } from '../signature/dto/signatureDto';
import { SignatureService } from '../signature/signature.service';
import type { UserDto } from '../user/dto/user-dto';
import type { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ApiConfigService,
    public readonly userService: UserService,
    public readonly companyService: CompanyService,
    public readonly signatureService: SignatureService,
  ) {}

  async createToken(user: UserEntity | UserDto): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({ id: user.id }),
    });
  }

  async validateUser(signatureDto: SignatureDto): Promise<UserEntity> {
    const signatureData = await this.signatureService.verifySignature(
      signatureDto,
    );
    if (signatureData.valid) {
      let user = await this.userService.findOne({
        idn: signatureData.subject.iin,
      });
      if (!user) {
        const {
          subject: { bin, organization, commonName, lastName, iin },
        } = signatureData;
        const paraCompany: CreateCompanyDto = {
          bin: bin as string,
          name: organization as string,
        };
        const companyE = await this.companyService.create(paraCompany);

        const fullName = commonName.split(' ');
        user = await this.userService.createUser({
          middleName: lastName as string,
          lastName: fullName[0] as string,
          firstName: fullName[1] as string,
          idn: iin as string,
          company: { id: companyE.id },
        });
      }
      return user;
    } else {
      throw new NotValidCertException();
    }
  }
}
