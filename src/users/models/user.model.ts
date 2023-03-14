
import { Table, Model, DataType, Column, BelongsToMany } from "sequelize-typescript";
import { Role } from "../../roles/models/role.model";
import { UserRoles } from "../../roles/models/user-roles.model";

interface UserCreationAttrs {
    name: string;
    email: string;
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    name: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}
