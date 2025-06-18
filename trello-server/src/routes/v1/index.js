
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'

const Router = express.Router()

/* Check APIs v1/status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs v1 are ready to use' })
})

/* Board APIs */
Router.use('/boards', boardRoutes)

/*Column APIs */
Router.use('/columns', columnRoute)

/*Cards APIs */
Router.use('/cards', cardRoute)

export const APIs_V1 = Router
