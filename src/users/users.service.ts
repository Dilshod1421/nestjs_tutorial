import { AddRoleDto } from './dto/add-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import { User } from './models/user.model';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly roleService: RolesService
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    // const role = await this.roleService.getRoleByValue('ADMIN')
    const role = await this.roleService.getRoleByValue('USER')
    if (!role) {
      throw new BadRequestException("role not founded")
    }
    // await newUser.$set('roles', [role.id]);
    // await newUser.save();
    newUser.roles = [role]

    return newUser
  }


  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true }
    })

    return user
  }


  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId)
    const role = await this.roleService.getRoleByValue(addRoleDto.value)

    if (role && user) {
      await user.$add('role', role.id)
      return user;
    }

    throw new HttpException(
      "Foydalanuvchi yoki role topilmadi",
      HttpStatus.NOT_FOUND
    )
  }

  async removeRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId)
    const role = await this.roleService.getRoleByValue(addRoleDto.value)

    if (role && user) {
      await user.$remove('role', role.id)
      return user;
    }

    throw new HttpException(
      "Foydalanuvchi yoki role topilmadi",
      HttpStatus.NOT_FOUND
    )
  }


  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepository.findByPk(activateUserDto.userId);

    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND)
    }

    user.is_active = true;
    await user.save()
    return user;
  }


  async deActivateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepository.findByPk(activateUserDto.userId);

    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND)
    }

    user.is_active = false;
    await user.save()
    return user;
  }


  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getOneUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.destroy({ where: { id } });

    if (!user) {
      throw new HttpException('Foydalanuvchi yuq', HttpStatus.NOT_FOUND)
    }
    return { messege: "Foydalanuvchi uchirildi" }
  }
}
