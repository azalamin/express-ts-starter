/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import { StudentRoutes } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/user/user.route'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1/students', StudentRoutes)
app.use('/api/v1/users', UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World I am here!')
})

// global error handler
app.use(globalErrorHandler)

// not found route
app.use(notFound)

export default app
