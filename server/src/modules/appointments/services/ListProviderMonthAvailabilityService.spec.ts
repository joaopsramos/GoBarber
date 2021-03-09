import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProfileMonthAvailability: ListProviderMonthAvailabilityService

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        listProfileMonthAvailability = new ListProviderMonthAvailabilityService(
            fakeAppointmentsRepository,
        )
    })

    it("should be able to list a provider's monthly availability", async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 0, 0).getTime()
        })

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 20, 8, 0, 0),
        })
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 20, 9, 0, 0),
        })
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 20, 10, 0, 0),
        })
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 20, 11, 0, 0),
        })
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 20, 12, 0, 0),
        })
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 20, 13, 0, 0),
        })
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 20, 14, 0, 0),
        })
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 20, 15, 0, 0),
        })
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 20, 16, 0, 0),
        })
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 20, 17, 0, 0),
        })
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 21, 18, 0, 0),
        })

        const availability = await listProfileMonthAvailability.execute({
            provider_id: 'provider',
            month: 2,
            year: 2020,
        })

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 19, available: true },
                { day: 20, available: false },
                { day: 21, available: true },
                { day: 22, available: true },
            ]),
        )
    })
})
