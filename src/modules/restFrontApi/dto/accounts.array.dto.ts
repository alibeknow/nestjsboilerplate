import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { AccountDto2 } from './account-entity.dto copy';

export class ArrayAccounts {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountDto2)
  accounts: AccountDto2[];
}
