import { User } from "../../../users/models/user.model";

export const userStub = (): Partial<User> => {
    return {
        id: 1,
        name: 'user1',
        email: 'user1@user.uz',
        password: 'password111',
        is_active: true,
    };
};