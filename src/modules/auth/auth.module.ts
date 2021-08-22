import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { CompanyModule } from '../company/company.module';
import { IbanModule } from '../iban/iban.module';
import { SignatureModule } from '../signature/signature.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    SignatureModule,
    CompanyModule,
    IbanModule,
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        secretOrPrivateKey: configService.authConfig.jwtSecret,
        // if you want to use token with expiration date
        // signOptions: {
        //     expiresIn: configService.getNumber('JWT_EXPIRATION_TIME'),
        // },
      }),
      inject: [ApiConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService],
})
export class AuthModule {}
