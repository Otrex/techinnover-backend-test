import { IsEnum, IsString, MaxLength } from 'class-validator';
import { EnumValidatorMessage } from './lib/utils';
import { DroneModel } from './database/enum';

export class AddDroneRequest {
  @IsEnum(...EnumValidatorMessage(DroneModel, 'model'))
  model: DroneModel;

  @IsString()
  @MaxLength(100)
  serialNumber: string;
}
