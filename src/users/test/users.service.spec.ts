import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { userStub } from "./stubs/user.stubs";
import { JwtService } from "@nestjs/jwt";
import { RolesService } from "../../roles/roles.service";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { Role } from "../../roles/models/role.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { ActivateUserDto } from "../dto/activate-user.dto";

describe('Users service', () => {
    let userService: UsersService;
    const mockUsersRepository = {
        create: jest.fn().mockImplementation(userStub),
        findOne: jest.fn().mockImplementation(userStub),
        findAll: jest.fn().mockImplementation(() => [userStub()]),
        destroy: jest.fn().mockImplementation(() => 1),
        findByPk: jest.fn().mockImplementation(userStub),
    };
    const mockRolesRepository = {
        findOne: jest.fn().mockImplementation(value => 'ADMIN')
    };

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                UsersService, JwtService, RolesService,
                {
                    provide: getModelToken(User),
                    useValue: mockUsersRepository,
                },
                {
                    provide: getModelToken(Role),
                    useValue: mockRolesRepository,
                },
            ],
        }).compile();
        userService = moduleRef.get<UsersService>(UsersService);
    });
    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('createUser', () => {
        describe('when createUser is called', () => {
            let createUsersDto: CreateUserDto;
            let newUser: User;
            beforeEach(async () => {
                createUsersDto = {
                    name: userStub().name,
                    email: userStub().email,
                    password: userStub().password,
                };
                newUser = await userService.createUser(createUsersDto);
            });
            it('should be create new user', async () => {
                expect(newUser).toEqual({
                    ...userStub(),
                    roles: ['ADMIN'],
                });
            });
        });
    });

    describe('getOneUser', () => {
        describe('when getOneUser is called', () => {
            test('then it should call usersService', async () => {
                expect(await userService.getOneUser(userStub().id)).toEqual(userStub());
            });
        });
    });

    describe('getUserByEmail', () => {
        describe('when getUserByEmail is called', () => {
            test('then it should call usersService', async () => {
                expect(await userService.getUserByEmail(userStub().email)).toEqual(userStub());
            });
        });
    });

    describe('getAllUser', () => {
        describe('when getAllUser is called', () => {
            test('then it should call usersService', async () => {
                expect(await userService.getAllUsers()).toEqual([userStub()]);
            });
        });
    });

    describe('deleteUser', () => {
        describe('when deleteUser is called', () => {
            test('then it should call usersService', async () => {
                expect(await userService.deleteUser(userStub().id)).toEqual({ messege: "Foydalanuvchi uchirildi" });
            });
        });
    });

});