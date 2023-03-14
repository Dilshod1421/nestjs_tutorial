import { ApiTags,ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';


@ApiTags('Rollar')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}


  @ApiOperation({summary: 'Role kiritish'})
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }
  

  @ApiOperation({summary: 'Xamma rollarni kurish'})
  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }


  @ApiOperation({summary: 'Roleni nomi buyicha olish'})
  @Get(':value')
  getRoleByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.rolesService.update(+id, updateRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.rolesService.remove(+id);
  // }
}
