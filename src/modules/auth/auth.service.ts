import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { NotValidCertException } from '../../exceptions/bad-request-ncanode';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { UtilsProvider } from '../../providers/utils.provider';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { UtilsService } from '../../shared/services/utils.service';
import { CompanyService } from '../company/company.service';
import type { CreateCompanyDto } from '../company/dto/createCompany.dto';
import { IbanService } from '../iban/iban.service';
import type { SignatureDto } from '../signature/dto/signatureDto';
import { SignatureService } from '../signature/signature.service';
import type { UserDto } from '../user/dto/user-dto';
import type { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import type { UserLoginDto } from './dto/UserLoginDto copy';
import type { UserRegisterXmlDto } from './dto/UserRegisterXmlDto';
@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ApiConfigService,
    public readonly userService: UserService,
    public readonly companyService: CompanyService,
    public readonly signatureService: SignatureService,
    public readonly ibanService: IbanService,
    public readonly utilsService: UtilsService,
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

  async validateUser(signatureDto: UserRegisterXmlDto): Promise<UserEntity> {
    const { idn, companyType, signedXml, email, bin } = signatureDto;
    const signatureData = await this.signatureService.verifySignature(
      signedXml,
    );
    let companyEntity;
    const isValidate = this.utilsService.validateSignature(
      signatureData,
      signatureDto,
    );
    if (isValidate) {
      let user = await this.userService.findOne({
        idn: signatureData.subject.iin,
      });
      const {
        subject: { organization, commonName, lastName, iin },
      } = signatureData;
      // eslint-disable-next-line unicorn/consistent-destructuring

      if (!signatureData.subject.organization) {
        signatureData.subject.organization = `ИП  ${commonName} ${lastName}`;
      }
      if (!user) {
        const paraCompany: CreateCompanyDto = {
          bin,
          name: signatureData.subject.organization,
          companyType,
        };
        companyEntity = await this.companyService.findOrCreate(paraCompany);
        const fullName = commonName.split(' ');
        user = await this.userService.createUser({
          middleName: lastName,
          lastName: fullName[0],
          firstName: fullName[1],
          idn: iin,
          email,
          company: companyEntity,
        });
      }
      return user;
    } else {
      throw new NotValidCertException(
        `Проверьте сертификат и введённый ИИН ${idn} введённый БИН 
        ${bin} ЭЦП ИИН:${signatureData.subject.iin} ЭЦП БИН:${signatureData.subject.bin}`,
      );
    }
  }
  async validateLogin(signatureDto: SignatureDto): Promise<UserEntity> {
    const signatureData = await this.signatureService.verifySignature(
      signatureDto,
    );
    if (signatureData.valid) {
      const user = await this.userService.findOne({
        idn: signatureData.subject.iin,
      });
      if (!user) {
        throw new UserNotFoundException('Пользователь не найден');
      }
      return user;
    } else {
      throw new NotValidCertException('Проверьте сертификат');
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
