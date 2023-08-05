import { ValidationOptions } from 'class-validator';

export const EnumValidatorMessage = <T extends Record<string, any>>(
  e: T,
  field: string,
  otherOptions: ValidationOptions = {}
): [T, ValidationOptions] => {
  return [
    e,
    {
      ...otherOptions,
      message: `${field} should be one of [${Object.values(e).join(', ')}]`,
    },
  ];
};
