import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsStrongPassword, MinLength,IsEmail} from 'class-validator'

export class CreateUserDto {

    @ApiProperty({example: 'Ismigul', description: "foydalanuvchi Ismi"})
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({example: 'ismidul@email.ru', description: "foydalanuvchi emaili"})
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: 'PA$$w0RdD', description: "foydalanuvchi paroli"})
    @IsStrongPassword()
    @MinLength(10,{})
    readonly password: string
}
