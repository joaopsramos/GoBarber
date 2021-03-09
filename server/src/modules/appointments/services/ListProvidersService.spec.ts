import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

import CreateUserService from '@modules/users/services/CreateUserService'
import ListProvidersService from './ListProvidersService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider

let createUser: CreateUserService
let listProviders: ListProvidersService

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        fakeCacheProvider = new FakeCacheProvider()

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        )

        listProviders = new ListProvidersService(
            fakeUsersRepository,
            fakeCacheProvider,
        )
    })

    it('should be able list the providers', async () => {
        const user1 = await createUser.execute({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        const user2 = await createUser.execute({
            name: 'John Trê',
            email: 'john@tre.com',
            password: '123456',
        })

        const loggedUser = await createUser.execute({
            name: 'John Qua',
            email: 'john@qua.com',
            password: '123456',
        })

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        })

        expect(providers).toEqual([user1, user2])
    })
})
