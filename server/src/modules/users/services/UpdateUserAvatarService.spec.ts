import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import CreateUserService from './CreateUserService'

import UpdateUserAvatarService from './UpdateUserAvatarService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeStorageProvider: FakeStorageProvider
let fakeCacheProvider: FakeCacheProvider

let createUser: CreateUserService
let updateUserAvatar: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        fakeCacheProvider = new FakeCacheProvider()
        fakeStorageProvider = new FakeStorageProvider()

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        )

        updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        )
    })

    it("should be able to update the user's avatar", async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        })

        expect(user.avatar).toBe('avatar.jpg')
    })

    it("should not be able to update the user's avatar when user does not exists", async () => {
        await expect(
            updateUserAvatar.execute({
                user_id: 'non-existing-user',
                avatarFileName: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should delete old avatar when avatar already exists and update it', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'new-avatar.jpg',
        })

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
        expect(user.avatar).toBe('new-avatar.jpg')
    })
})
