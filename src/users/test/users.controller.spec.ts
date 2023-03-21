import { userStub } from './stubs/user.stubs';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from './../../app.module';
import { Test } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersController } from './../users.controller';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';


jest.mock('../users.service')

describe('User controller', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            // imports: [AppModule],
            controllers: [UsersController],
            providers: [UsersService, JwtService]

        }).compile()

        usersController = moduleRef.get<UsersController>(UsersController);
        usersService = moduleRef.get<UsersService>(UsersService);
        jest.clearAllMocks()

    });

    it('shoud be defined usersController', () => {
        expect(usersController).toBeDefined();
    })

    describe('createUser', () => {
        describe('when createUser is called', () => {
            let user: User
            let createUserDto: CreateUserDto;
            beforeEach(async () => {
                createUserDto = {
                    name: userStub().name,
                    email: userStub().email,
                    password: userStub().password,
                };

                user = await usersController.createUser(createUserDto);
            });

            it('then it should call usersService', () => {
                expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
            });
            it('then it should return user', ()=>{
                expect(user).toEqual(userStub());
            });

        });
    });   

    describe('getOneUser', ()=>{
        describe('when getOneUser is called', ()=>{
            let user: User;
            beforeEach(async () => {
                user = await usersController.getOneUser(userStub().id);
            });
            it('then it should call usersService', ()=>{
                expect(usersService.getOneUser).toBeCalledWith(userStub().id);
            });
            it('then it should return user', () => {
                expect(user).toEqual(userStub());
            });
        });
    })

    describe('getAllUser', ()=>{
        describe('when getAllUser is called', ()=>{
            let users: User[];
            beforeEach(async () => {
                users = await usersController.getAllUsers();
            });
            it('then it should call usersService', ()=>{
                expect(usersService.getAllUsers).toBeCalled();
            });
            it('then it should return user', () => {
                expect(users).toEqual([userStub()]);
            });
        });
    });

    describe('deleteUser', ()=>{
        describe('when deleteUser is called', ()=>{
            let res: Object;
            beforeEach(async () => {
                res = await usersController.deleteUser(userStub().id);
            });
            it('then it should call usersService', ()=>{
                expect(usersService.deleteUser).toBeCalledWith(userStub().id);
            });
            it('then it should return user', () => {
                expect(res).toEqual({ messege: "Foydalanuvchi uchirildi"});
            });
        });
    });
})

