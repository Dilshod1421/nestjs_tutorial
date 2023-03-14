
import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Products} from "../../products/models/product.model";


interface SalesmanCreationAttr {
    first_name: string;
    last_name: string;
    job: string;
}



@Table({tableName: 'salesman'})
export class Salesman extends Model<Salesman, SalesmanCreationAttr>{
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
    first_name: string;

    @Column({
        type: DataType.STRING
    })
    last_name: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    job: string;

    @HasMany(() => Products)
    products: Products[]
}
