import { userStub } from '../test/stubs/user.stubs';


export const UsersService = jest.fn().mockReturnValue({
    createUser: jest.fn().mockResolvedValue(userStub()),
    getOneUser: jest.fn().mockResolvedValue(userStub()),
    getAllUsers: jest.fn().mockResolvedValue([userStub()]),
    deleteUser: jest.fn().mockResolvedValue({ messege: "Foydalanuvchi uchirildi"}),
})