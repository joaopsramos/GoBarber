import AppError from '@shared/errors/AppError'

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import ResetPasswordService from './ResetPasswordService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let resetPassword: ResetPasswordService
let fakeHashProvider: FakeHashProvider

describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeUserTokensRepository = new FakeUserTokensRepository()
        fakeHashProvider = new FakeHashProvider()

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
            fakeHashProvider,
        )
    })

    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

        const { token } = await fakeUserTokensRepository.generate(user.id)

        await resetPassword.execute({
            token,
            password: '123123',
        })

        const updatedUser = await fakeUsersRepository.findById(user.id)

        expect(generateHash).toHaveBeenCalledWith('123123')
        expect(updatedUser?.password).toBe('123123')
    })

    it('should not be able to reset the password with a token that does not exists', async () => {
        await expect(
            resetPassword.execute({
                token: 'non-existing-token',
                password: '123456 ',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to reset the password of a user who does not exists', async () => {
        const { token } = await fakeUserTokensRepository.generate(
            'User that does not exists',
        )

        await expect(
            resetPassword.execute({
                token,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to reset the password if the token has already expired', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        const { token } = await fakeUserTokensRepository.generate(user.id)

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date()

            return customDate.setHours(customDate.getHours() + 3)
        })

        await expect(
            resetPassword.execute({
                token,
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError)
    })
})
