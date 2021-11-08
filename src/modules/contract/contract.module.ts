import { Module } from '@nestjs/common';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';

@Module({
  controllers: [ContractController],
  providers: [ContractService, ApiConfigService],
  exports: [ContractService],
})
export class IbanModule {}
