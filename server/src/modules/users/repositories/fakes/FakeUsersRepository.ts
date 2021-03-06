import { uuid } from 'uuidv4'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'

import User from '@modules/users/infra/typeorm/entities/User'

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = []

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find((user) => user.id === id)

        return findUser
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find((user) => user.email === email)

        return findUser
    }

    public async findAllProviders({
        exceptUserId,
    }: IFindAllProvidersDTO): Promise<User[]> {
        if (!exceptUserId) return this.users

        const users = this.users.filter((user) => user.id !== exceptUserId)

        return users
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User()

        Object.assign(user, { id: uuid() }, userData)

        this.users.push(user)

        return user
    }

    public async update(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            (findUser) => findUser.id === user.id,
        )

        this.users[findIndex] = user

        return user
    }
}

export default FakeUsersRepository
