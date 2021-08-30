import { Global, HttpModule, Module } from '@nestjs/common';

import { ApiConfigService } from './services/api-config.service';
import { GeneratorService } from './services/generator.service';
import { TranslationService } from './services/translation.service';
import { ValidatorService } from './services/validator.service';

const providers = [
  ApiConfigService,
  ValidatorService,
  GeneratorService,
  TranslationService,
];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class SharedModule {}
