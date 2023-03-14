import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from '../../users/models/user.model';



interface PostCreationAttr {
    title: string;
    content: string;
    image: string;
    userId: number;
}
@Table({tableName: 'posts'})
export class Post extends Model<Post,PostCreationAttr >{

    @ApiProperty({example: '1', description: 'Unikal'})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({example: "Post1", description: 'Maqola sarlovxasi'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string


    @ApiProperty({
        example: "Bu erda maqola matni buladi", 
        description: 'Maqola matni'})
    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    content: string;

    @ApiProperty({
        example: "rasm", 
        description: 'Maqola rasmi'})
    @Column({
        type: DataType.STRING,

    })
    image: string;


    @ForeignKey(() => User)
    @Column ({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User;
}
