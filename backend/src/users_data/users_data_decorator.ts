// import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// export const Email = createParamDecorator(
//     (data: unknown, ctx: ExecutionContext) => {
//       const request = ctx.switchToHttp().getRequest();
//       return request.body.email;
//     },
// );


// import { Injectable, ConflictException } from '@nestjs/common';
// import { Repository } from "typeorm";
// import { User } from "./entities/users_data.entity";

// @Injectable()
// export class EmailUniqueService {
//   constructor(private readonly userRepository: Repository<User>) {}

//   async isEmailUnique(email: string) {
//     const user = await this.userRepository.findOne(email);
//     if (user) {
//       throw new ConflictException('Email already exists');
//     }
//   }
// }

// export function IsUnique(property: string, validationOptions?: ValidationOptions) {

//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       name: 'IsUnique',
//       target: object.constructor,
//       propertyName: propertyName,
//       constraints: [property],
//       options: {message: 'Value already exists in the table!'},
//       validator: {
//         async validate(value: any, args: ValidationArguments) {
//             const [repository, column] = args.constraints as [Repository<any>, string]

//             if (!value) {
//                 return false;
//             }

//             const record = await repository.findOne({where: { [column]: value }});

//             return !!record

//         },
//       },
//     });
//   };
// }

import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EntityManager, Repository } from 'typeorm';

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

// export function IfExists(table: string, column:string, validationOptions?: ValidationOptions) {

//     return function (object: Object, propertyName: string) {
//       registerDecorator({
//         name: 'IfExists',
//         target: object.constructor,
//         propertyName: propertyName,
//         constraints: [table, column],
//         options: { message: 'Value does not exists in the table!' },
//         validator: {
//           async validate(value: any, args: ValidationArguments) {

//               const [table, column] = args.constraints

//               const entityManager = new EntityManager

//               const repository = entityManager.getRepository()
  
  
//               if (!value) {
//                   return false;
//               }
  
//               const record = await repository.findOne({where: { [column]: value }});
  
//               return !record
  
//           },
//         },
//       });
//     };
//   }

// import { InjectRepository } from '@nestjs/typeorm';
// import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, } from 'class-validator';
// import { Repository } from 'typeorm';
  
// @ValidatorConstraint({ async: true })
// export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {

// async validate(value: any, args: ValidationArguments) {
//     const [repository, column] = args.constraints as [Repository<any>, string]

//     if (!value) {
//         return false;
//     }
    
//     const record = await repository.findOne({where: { [column]: value }});

//     return !!record

//     }

//     defaultMessage(validationArguments?: ValidationArguments): string {
        
//     }
// }
  
// export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string) {
//       registerDecorator({
//         target: object.constructor,
//         propertyName: propertyName,
//         options: validationOptions,
//         constraints: [],
//         validator: IsUserAlreadyExistConstraint,
//       });
//     };
// }