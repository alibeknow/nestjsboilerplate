import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { NotValidCertException } from '../../exceptions/not-valid-cert.eception';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { UtilsProvider } from '../../providers/utils.provider';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { CompanyService } from '../company/company.service';
import type { CreateCompanyDto } from '../company/dto/createCompany.dto';
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
  ) {}

  async createToken(user: UserEntity | UserDto): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        id: user.id,
        role: user.role,
        bin: user.company.bin,
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
      if (!user) {
        const {
          subject: { bin, organization, commonName, lastName, iin },
        } = signatureData;
        const paraCompany: CreateCompanyDto = {
          bin: bin as string,
          name: organization as string,
        };
        companyEntity = await this.companyService.findOrCreate(paraCompany);
        const fullName = commonName.split(' ');
        user = await this.userService.createUser({
          middleName: lastName as string,
          lastName: fullName[0] as string,
          firstName: fullName[1] as string,
          idn: iin as string,
          company: { id: companyEntity.id },
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
