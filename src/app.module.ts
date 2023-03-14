import { User } from './users/models/user.model';
import { UserRoles } from './roles/models/user-roles.model';
import { RolesModule } from './roles/roles.module';


import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {SequelizeModule} from '@nestjs/sequelize'
import { Role } from './roles/models/role.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SalesmanModule } from './salesman/salesman.module';
import { ProductsModule } from './products/products.module';
import { Salesman } from './salesman/models/salesman.model';
import { Products } from './products/models/product.model';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import { Post } from './posts/models/post.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname,'static')
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [Role,UserRoles,User, Salesman, Products],
            autoLoadModels: true,
            logging: true
        }),
        RolesModule,
        UsersModule,
        AuthModule,
        SalesmanModule,
        ProductsModule,
        PostsModule,
        FilesModule
      ],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {}
