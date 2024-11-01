import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {

  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments) {

    const [table, column] = args.constraints

    if (!value) {
      return false
    } 

    const repository = this.entityManager.getRepository(table)

    const record = await repository.findOne({where: { [column]: value }});

    return !record

  }

  defaultMessage(args?: ValidationArguments) {

    return `${args.value} Already Exists`
  }
}

export function IsUnique(table: string, column: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table, column],
      options: validationOptions,
      validator: IsUniqueConstraint,
    });
  };
}

@ValidatorConstraint({ async: true })
@Injectable()
export class IfExistsConstraint implements ValidatorConstraintInterface {

  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments) {

    const [table, column] = args.constraints

    if (!value) {
      return false
    } 

    const repository = this.entityManager.getRepository(table)

    const record = await repository.findOne({where: { [column]: value }});
  
    return !!record

  }

  defaultMessage(args?: ValidationArguments) {

    return `${args.value} Doesn't Exists`
  }
}

export function IfExists(table: string, column: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IfExists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table, column],
      options: validationOptions,
      validator: IfExistsConstraint,
    });
  };
}