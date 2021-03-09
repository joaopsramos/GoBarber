import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import UpdateProfileService from './UpdateProfileService'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider

let createUser: CreateUserService
let updateProfile: UpdateProfileService

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

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        )
    })

    it('should be able to update the profile', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@test.com',
        })

        expect(updatedUser.name).toBe('John Trê')
        expect(updatedUser.email).toBe('johntre@test.com')
    })

    it('should not be able to update the profile of a user that does not exist', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'Invalid user',
                name: 'John Trê',
                email: 'johntre@test.com',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to update the email to an email that already exists', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        const user = await createUser.execute({
            name: 'John Trê',
            email: 'johntre@test.com',
            password: '123456',
        })

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'john@test.com',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to update the password', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@test.com',
            password: 'newPassword',
            old_password: '123456',
        })

        expect(updatedUser.password).toBe('newPassword')
    })

    it('should not be able to update the password without confirmation', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@test.com',
                password: 'newPassword',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to update the password with an incorrect old password', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@test.com',
                password: 'newPassword',
                old_password: 'wrongOldPassword',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })
})
