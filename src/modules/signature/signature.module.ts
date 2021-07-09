import { Module } from '@nestjs/common';

import { SignatureController } from './signature.controller';
import { SignatureService } from './signature.service';

@Module({
  controllers: [SignatureController],
  providers: [SignatureService],
  exports: [SignatureService],
})
export class SignatureModule {}
