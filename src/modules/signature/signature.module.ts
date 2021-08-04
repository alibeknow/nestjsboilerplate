import { forwardRef, Module } from '@nestjs/common';

import { DocumentModule } from '../document/document.module';
import { SignatureController } from './signature.controller';
import { SignatureService } from './signature.service';

@Module({
  imports: [forwardRef(() => DocumentModule)],
  controllers: [SignatureController],
  providers: [SignatureService],
  exports: [SignatureService],
})
export class SignatureModule {}
