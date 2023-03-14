import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Salesman } from '../salesman/models/salesman.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Products } from './models/product.model';

@Module({
  imports:[SequelizeModule.forFeature([Salesman,Products])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
