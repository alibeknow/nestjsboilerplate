import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { NotValidCertException } from '../../exceptions/not-valid-cert.eception';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { UtilsProvider } from '../../providers/utils.provider';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { CompanyService } from '../company/company.service';
import type { CreateCompanyDto } from '../company/dto/createCompany.dto';
import type { IbanAccountDto } from '../iban/dto/ibanAccount.dto';
import type { IbanAccountServiceDto } from '../iban/dto/ibanAccountService.dto';
import { IbanService } from '../iban/iban.service';
import type { SignatureDto } from '../signature/dto/signatureDto';
import { SignatureService } from '../signature/signature.service';
import type { UserDto } from '../user/dto/user-dto';
import type { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import type { UserLoginDto } from './dto/UserLoginDto copy';
@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ApiConfigService,
    public readonly userService: UserService,
    public readonly companyService: CompanyService,
    public readonly signatureService: SignatureService,
    public readonly ibanService: IbanService,
  ) {}

  async createToken(user: UserEntity | UserDto): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        id: user.id,
        role: user.role,
      }),
    });
  }

  async validateUser(signatureDto: SignatureDto): Promise<UserEntity> {
    const signatureData = await this.signatureService.verifySignature(
      signatureDto,
    );
    let companyEntity;
    if (signatureData.valid) {
      let user = await this.userService.findOne({
        idn: signatureData.subject.iin,
      });
      const {
        subject: { bin, organization, commonName, lastName, iin, email },
      } = signatureData;
      if (!user) {
        const paraCompany: CreateCompanyDto = {
          bin,
          name: organization,
        };
        companyEntity = await this.companyService.findOrCreate(paraCompany);
        const fullName = commonName.split(' ');
        user = await this.userService.createUser({
          middleName: lastName,
          lastName: fullName[0],
          firstName: fullName[1],
          idn: iin,
          company: { id: companyEntity.id },
        });
        if (!companyEntity.iban) {
          await this.ibanService.createIbanAccount({
            bin,
            companyName: organization,
            mobileNumber: '',
            email,
            address: '',
          });
        }
      }
      if (!user.company.iban) {
        console.log('we are here');
        await this.ibanService.createIbanAccount({
          bin,
          companyName: organization,
          mobileNumber: '',
          email,
          address: '',
        });
      }

      return user;
    } else {
      throw new NotValidCertException();
    }
  }

  async validateOperator(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });
    const isPasswordValid = await UtilsProvider.validateHash(
      userLoginDto.password,
      user?.password,
    );
    if (!user || !isPasswordValid) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
