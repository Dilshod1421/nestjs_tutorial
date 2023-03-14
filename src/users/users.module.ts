
import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/user.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import {Role} from '../roles/models/role.model'
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule,
forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
