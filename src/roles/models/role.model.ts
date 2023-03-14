import { Table,Model,DataType,Column,BelongsToMany } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    value: string;
    description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true
    })
    value: true

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    description: string


    @BelongsToMany(() => User, () => UserRoles)
    users: User[];

}
