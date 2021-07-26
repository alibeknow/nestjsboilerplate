import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { NotValidCertException } from '../../exceptions/not-valid-cert.eception';
import { ApiConfigService } from '../../shared/services/api-config.service';
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
    console.log(signatureData);
    if (signatureData.valid) {
      let user = await this.userService.findOne({
        idn: signatureData.subject.iin,
      });
      if (!user) {
        const fullName = signatureData.subject.commonName.split(' ');

        user = await this.userService.createUser({
          middleName: signatureData.subject.lastName as string,
          lastName: fullName[0] as string,
          firstName: fullName[1] as string,
          idn: signatureData.subject.iin,
        });
      }
      return user;
    } else {
      throw new NotValidCertException();
    }
  }
}
