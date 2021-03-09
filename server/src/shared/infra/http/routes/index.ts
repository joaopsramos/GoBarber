import { Router } from 'express'

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes'
import profileRouter from '@modules/users/infra/http/routes/profile.routes'
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes'

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)
routes.use('/profile', profileRouter)
routes.use('/providers', providersRouter)
routes.use('/appointments', appointmentsRouter)
routes.use('/password', passwordRouter)

export default routes
