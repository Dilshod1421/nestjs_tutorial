import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
export class AddRoleDto {

    @ApiProperty({example: 'ADMIN/USER', description: "foydalanuvchi roli"})
    @IsNotEmpty()
    @IsString()
    readonly value: string;

    @ApiProperty({example: '2', description: "foydalanuvchi IDsi"})
    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;
}