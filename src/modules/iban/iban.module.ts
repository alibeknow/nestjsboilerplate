import { Module } from '@nestjs/common';

import { IbanController } from './iban.controller';
import { IbanService } from './iban.service';

@Module({
  controllers: [IbanController],
  providers: [IbanService],
  exports: [IbanService],
})
export class IbanModule {}
