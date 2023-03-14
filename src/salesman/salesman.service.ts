import { Injectable } from '@nestjs/common';
import { CreateSalesmanDto } from './dto/create-salesman.dto';
import { UpdateSalesmanDto } from './dto/update-salesman.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Salesman } from './models/salesman.model';

@Injectable()
export class SalesmanService {

  constructor(
    @InjectModel(Salesman) private salesmanRepository: typeof Salesman){}
      
    async createSalesman(createSalesmanDto: CreateSalesmanDto){
       const newSalesman = await this.salesmanRepository.create(createSalesmanDto)
       return newSalesman
    }


    async getAllSalesman(){
      const newSalesman = await this.salesmanRepository.findAll({})
       return newSalesman
    }

 
}
