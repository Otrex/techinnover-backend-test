import { ClassConstructor, plainToClass, plainToInstance } from 'class-transformer';
import { validate, ValidationError as CValidationError } from 'class-validator';
import AppError from './errors';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

const getAllConstraints = (errors: CValidationError[]): Record<string, string>[] => {
  const constraints = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const error of errors) {
    if (error.constraints) {
      constraints.push(error.constraints);
    }
    if (error.children) {
      constraints.push(...getAllConstraints(error.children));
    }
  }

  return constraints;
};

export default function Validate<T>(type: ClassConstructor<T>) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const transformed = plainToInstance<T, unknown>(type, args[0]);
      const errors = await validate(transformed as any, {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false },
      });
      if (errors.length > 0) {
        const constraints = getAllConstraints(errors);
        throw new AppError(constraints.map((c) => Object.values(c)).flat());
      }
      const [params, ...others] = args;
      return originalMethod.apply(this, [{ ...new type(), ...params }, ...others]);
    };
    return descriptor;
  };
}
