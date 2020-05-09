import { IsString, IsInt } from 'class-validator';

export class UserEntity {

  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
