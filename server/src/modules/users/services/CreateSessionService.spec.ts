import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import CreateSessionService from './CreateSessionService'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider

let createUser: CreateUserService
let createSession: CreateSessionService

describe('CreateSession', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        fakeCacheProvider = new FakeCacheProvider()

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        )
        createSession = new CreateSessionService(
            fakeUsersRepository,
            fakeHashProvider,
        )
    })

    it('should be able to create a session (authenticate)', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        const response = await createSession.execute({
            email: 'john@test.com',
            password: '123456',
        })

        expect(response).toHaveProperty('token')
        expect(response.user).toEqual(user)
    })

    it('should not be able to create a session with an user that not exists', async () => {
        await expect(
            createSession.execute({
                email: 'john@test.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to create a session with wrong password', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        await expect(
            createSession.execute({
                email: 'john@test.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })
})
