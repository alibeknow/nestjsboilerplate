import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { SignatureDto } from '../signature/dto/signatureDto';
import { UserDto } from '../user/dto/user-dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto copy';
import { UserRegisterXmlDto } from './dto/UserRegisterXmlDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    public readonly userService: UserService,
    public readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(
    @Body() signatureDto: SignatureDto,
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateLogin(signatureDto);
    const token = await this.authService.createToken(userEntity);
    return new LoginPayloadDto(
      userEntity.toDto(),
      token,
      userEntity.company.toDto(),
    );
  }

  @Post('operator')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async operatorLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateOperator(userLoginDto);
    const token = await this.authService.createToken(userEntity);
    return new LoginPayloadDto(
      userEntity.toDto(),
      token,
      userEntity.company.toDto(),
    );
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'Successfully Registered',
  })
  async userRegister(
    @Body() userRegisterDto: UserRegisterXmlDto,
  ): Promise<LoginPayloadDto> {
    const createdUser = await this.authService.validateUser(userRegisterDto);
    const token = await this.authService.createToken(createdUser);
    return new LoginPayloadDto(
      createdUser.toDto(),
      token,
      createdUser.company.toDto(),
    );
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }
}
