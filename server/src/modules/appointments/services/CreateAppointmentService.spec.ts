import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let createAppointmentService: CreateAppointmentService
let fakeCacheProvider: FakeCacheProvider

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        fakeNotificationsRepository = new FakeNotificationsRepository()
        fakeCacheProvider = new FakeCacheProvider()

        createAppointmentService = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakeCacheProvider,
        )
    })

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        const appointment = await createAppointmentService.execute({
            provider_id: '123456',
            user_id: '123123',
            date: new Date(2020, 4, 10, 13),
        })

        expect(appointment).toHaveProperty('id')
        expect(appointment.provider_id).toBe('123456')
    })

    it('should not be able to create two appointments on the same date', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        const date = new Date(2020, 4, 10, 13)

        await createAppointmentService.execute({
            provider_id: '123456',
            user_id: '123123',
            date,
        })

        await expect(
            createAppointmentService.execute({
                provider_id: '123456',
                user_id: '123123',
                date,
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(
            createAppointmentService.execute({
                provider_id: '123456',
                user_id: '123123',
                date: new Date(2020, 4, 10, 11),
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a appointment with the same user as the provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(
            createAppointmentService.execute({
                provider_id: 'user',
                user_id: 'user',
                date: new Date(2020, 4, 10, 13),
            }),
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(
            createAppointmentService.execute({
                provider_id: 'provider1',
                user_id: 'user1',
                date: new Date(2020, 4, 11, 7),
            }),
        ).rejects.toBeInstanceOf(AppError)

        await expect(
            createAppointmentService.execute({
                provider_id: 'provider2',
                user_id: 'user2',
                date: new Date(2020, 4, 11, 18),
            }),
        ).rejects.toBeInstanceOf(AppError)
    })
})
