import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { SalesmanController } from './salesman.controller';
import { Salesman } from './models/salesman.model';

@Module({
  imports: [SequelizeModule.forFeature([Salesman])],
  controllers: [SalesmanController],
  providers: [SalesmanService]
})
export class SalesmanModule {}
