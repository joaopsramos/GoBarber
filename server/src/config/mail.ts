interface MailConfig {
    driver: 'ethereal' | 'ses'

    defaults: {
        from: {
            email: string
            name: string
        }
    }
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: 'joaopsramos231@gmail.com',
            name: 'Equipe GoBarber',
        },
    },
} as MailConfig
