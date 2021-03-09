import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import User from '../infra/typeorm/entities/User'

interface Request {
    user_id: string
    name: string
    email: string
    old_password?: string
    password?: string
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

        if (!user) throw new AppError('User not found')

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail && userWithSameEmail.id !== user.id)
            throw new AppError('E-mail already in use')

        user.name = name
        user.email = email

        if (password) {
            if (!old_password)
                throw new AppError(
                    'You need to inform your old password to update to a new one',
                )

            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            )

            if (!checkOldPassword) throw new AppError('Invalid old password')

            const hashedPassword = await this.hashProvider.generateHash(
                password,
            )

            user.password = hashedPassword
        }

        return this.usersRepository.update(user)
    }
}

export default UpdateProfileService
