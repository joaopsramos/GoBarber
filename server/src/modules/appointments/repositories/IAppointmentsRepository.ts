import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProvider'
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProvider'

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>
    findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined>
    findAllInDayFromProvider(
        data: IFindAllInDayFromProviderDTO,
    ): Promise<Appointment[]>
    findAllInMonthFromProvider(
        data: IFindAllInMonthFromProviderDTO,
    ): Promise<Appointment[]>
}
