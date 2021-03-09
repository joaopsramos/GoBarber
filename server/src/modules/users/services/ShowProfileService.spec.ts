import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import ShowProfileService from './ShowProfileService'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider

let createUser: CreateUserService
let showProfile: ShowProfileService

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        fakeCacheProvider = new FakeCacheProvider()

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        )

        showProfile = new ShowProfileService(fakeUsersRepository)
    })

    it('should be able to show the profile', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        const profile = await showProfile.execute({
            user_id: user.id,
        })

        expect(profile.name).toBe('John Doe')
        expect(profile.email).toBe('john@test.com')
    })

    it('should not be able to show the profile of a user that does not exist', async () => {
        await expect(
            showProfile.execute({
                user_id: 'Invalid user',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })
})
