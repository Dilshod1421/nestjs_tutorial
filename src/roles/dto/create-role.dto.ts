import { IsNotEmpty, IsString } from "class-validator";
import {ApiProperty} from '@nestjs/swagger'

export class CreateRoleDto {

    @ApiProperty({example: 'ADMIN/USER', description: "foydalanuvchi roli"})
    @IsNotEmpty()
    @IsString()
    readonly value: string;

    @ApiProperty({example: 'descriptionnini', description: "Role malumoti"})
    @IsNotEmpty()
    @IsString()
    readonly description: string
}
