import { injectable, inject } from 'tsyringe'
import { getDaysInMonth, getDate, isAfter } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface Request {
    provider_id: string
    month: number
    year: number
}

type Response = Array<{
    day: number
    available: boolean
}>

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
    }: Request): Promise<Response> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            {
                provider_id,
                month,
                year,
            },
        )

        const numberOfDays = getDaysInMonth(new Date(year, month - 1))

        const eachDayArray = Array.from(
            { length: numberOfDays },
            (_, index) => index + 1,
        )

        const availability = eachDayArray.map((day) => {
            const appointmentsInDay = appointments.filter((appointment) => {
                return getDate(appointment.date) === day
            })

            const compareDate = new Date(year, month - 1, day, 23, 59, 59)

            return {
                day,
                available:
                    appointmentsInDay.length < 10 &&
                    isAfter(compareDate, new Date(Date.now())),
            }
        })

        return availability
    }
}

export default ListProviderMonthAvailabilityService
