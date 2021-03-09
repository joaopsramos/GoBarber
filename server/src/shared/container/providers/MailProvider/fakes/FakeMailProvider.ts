import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'

class FakeMailProvider implements IMailProvider {
    private emails: ISendMailDTO[] = []

    public async sendMail(email: ISendMailDTO): Promise<void> {
        this.emails.push(email)
    }
}

export default FakeMailProvider
