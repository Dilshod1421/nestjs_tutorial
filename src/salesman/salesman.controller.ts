import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { CreateSalesmanDto } from './dto/create-salesman.dto';


@Controller('salesman')
export class SalesmanController {
  constructor(private readonly salesmanService: SalesmanService) {}

  @Post('create')
  createSalesman(@Body() createSalesmanDto: CreateSalesmanDto) {
    return this.salesmanService.createSalesman(createSalesmanDto);
  }

  @Get()
  getAllSalesman() {
    return this.salesmanService.getAllSalesman();
  }
 
}
