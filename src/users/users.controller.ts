import { ApiOperation, SwaggerModule } from '@nestjs/swagger';
import { AddRoleDto } from './dto/add-role.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import {ApiTags} from '@nestjs/swagger'
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSelfGuard } from '../guards/user-self.guard';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Users lar bulimi')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({summary: 'Userga rol quwiw'})
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('role')
  addRole(@Body() addRoleDto: AddRoleDto){
    return this.usersService.addRole(addRoleDto)
  }


  @ApiOperation({summary: 'Userni rolini uchiriw'})
  @HttpCode(200)
  @Post('remove')
  removeRole(@Body() addRoleDto: AddRoleDto){
    return this.usersService.removeRole(addRoleDto)
  }


  @ApiOperation({summary: 'User aktivaciya qiliw'})
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUserDto){
    return this.usersService.activateUser(activateUserDto);
  }


  @ApiOperation({summary: 'Userni deaktivaciya qiliw'})
  @Post('deactivate')
  deActivateUser(@Body() activateUserDto: ActivateUserDto){
    return this.usersService.deActivateUser(activateUserDto);
  }

  @ApiOperation({summary: 'Xamma userlarni chiqarish'})
  @UseGuards(JwtAuthGuard)  
  @Get('all')
  getAllUsers(){
    return this.usersService.getAllUsers();
  } 

  @ApiOperation({summary: 'Bitta userni chiqariw'})
  // @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)  
  @Get(":id")
  getOneUser(@Param("id") id: number){
    return this.usersService.getOneUser(+id);
  }




  @ApiOperation({summary: 'Userni uchirish'})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)  
  @Delete(":id")
  deleteUser(@Param("id") id:number){
    return this.usersService.deleteUser(id)
  }



  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
