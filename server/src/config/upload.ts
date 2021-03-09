import crypto from 'crypto'
import path from 'path'
import multer, { StorageEngine } from 'multer'

const tempFolder = path.resolve(__dirname, '..', '..', 'temp')
const uploadsFolder = path.resolve(tempFolder, 'uploads')

interface UploadConfig {
    driver: 'disk' | 's3'

    tempDirectory: string
    uploadsDirectory: string

    multer: {
        storage: StorageEngine
    }

    config: {
        disk: {}
        aws: {
            bucket: string
        }
    }
}

export default {
    driver: process.env.STORAGE_DRIVER,

    tempDirectory: tempFolder,
    uploadsDirectory: uploadsFolder,

    multer: {
        storage: multer.diskStorage({
            destination: tempFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex')
                const fileName = `${fileHash}-${file.originalname}`

                return callback(null, fileName)
            },
        }),
    },

    config: {
        disk: {},
        aws: {
            bucket: 'my-app-gobarber-dev',
        },
    },
} as UploadConfig
