import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import {Role} from './models/role.model'

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role){}

  async createRole(createRoleDto: CreateRoleDto){
    const newRole = await this.roleRepository.create(createRoleDto)
    return newRole
  }


  
  // create(createRoleDto: CreateRoleDto) {
  //   return 'This action adds a new role';
  // }

  async getAllRoles() {
     const roles = await this.roleRepository.findAll({include: {all:true}})
     return roles
  }

  async getRoleByValue(value: string){
    const role = await this.roleRepository.findOne({ where: { value}})
    return role
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} role`;
  // }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }
}
