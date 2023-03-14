import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsStrongPassword, MinLength,IsEmail} from 'class-validator'


export class CreateProductDto {
    @ApiProperty({example: 'Product name', description: "product nomi Ismi"})
    @IsNotEmpty()
    @IsString()
    readonly product_name: string;
    @ApiProperty({example: 2, description: "sotuvchi IDsi"})
    @IsNotEmpty()

    readonly sales_id: number;
}
