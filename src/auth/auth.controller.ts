import { CreateUserDto } from './../users/dto/create-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post ('/registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto)
  }


  @HttpCode(200)
  @Post('/login')
  login(@Body() loginDto: LoginDto  ){
    return this.authService.login(loginDto)
  }
  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }


}
