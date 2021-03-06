import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { errors } from 'celebrate'
import 'express-async-errors'

import '@shared/infra/typeorm'
import '@shared/container'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import rateLimiter from './middlewares/rateLimiter'

import routes from './routes'

const app = express()

app.use(
    cors({
        origin: process.env.APP_WEB_URL,
    }),
)
app.use(express.json())

app.use('/files', express.static(uploadConfig.uploadsDirectory))
app.use(rateLimiter) // Precisa ser depois da rota dos files, para poder buscar as imagens
app.use(routes)

app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }

    console.log(err)

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
})

app.listen(3333, () => {
    console.log('🚀 Server running on port 3333...')
})
