import { Salesman } from './../../salesman/models/salesman.model';
import { Model, Table,Column,DataType, ForeignKey, BelongsTo} from "sequelize-typescript";

export class Product {}

interface ProductCreationAttr {
    product_name: string;
    sales_id: number;
}


@Table({tableName: 'products'})
export class Products extends Model<Product, ProductCreationAttr>{
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
    product_name: string;

    @ForeignKey(()=>Salesman)
    @Column({
        type: DataType.INTEGER
    })
    sales_id: number

    @BelongsTo(()=> Salesman)
    saleman: Salesman[]
    
}