import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProfileDayAvailability: ListProviderDayAvailabilityService

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        listProfileDayAvailability = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository,
        )
    })

    it("should be able list a provider's day availability", async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 20, 12, 0, 0),
        })

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 1, 20, 15, 0, 0),
        })

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 1, 20, 10).getTime()
        })

        const availability = await listProfileDayAvailability.execute({
            provider_id: 'provider',
            day: 20,
            month: 2,
            year: 2020,
        })

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 11, available: true },
                { hour: 12, available: false },
                { hour: 13, available: true },
                { hour: 14, available: true },
                { hour: 15, available: false },
                { hour: 16, available: true },
            ]),
        )
    })
})
