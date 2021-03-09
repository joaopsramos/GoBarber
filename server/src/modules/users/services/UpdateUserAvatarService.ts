import path from 'path'
import fs from 'fs'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import uploadConfig from '@config/upload'

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import IUsersRepository from '../repositories/IUsersRepository'
import User from '../infra/typeorm/entities/User'

interface Request {
    user_id: string
    avatarFileName: string
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

        if (!user) throw new AppError('User not found.', 412)

        if (user.avatar) await this.storageProvider.deleteFile(user.avatar)

        const fileName = await this.storageProvider.saveFile(avatarFileName)

        user.avatar = fileName

        await this.usersRepository.update(user)

        return user
    }
}

export default UpdateUserAvatarService
