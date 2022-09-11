import express from 'express'
import { travelerRoutes } from './modules/traveler/routes'

const app = express()

app.use(express.json())
app.use('/travelers', travelerRoutes)

app.listen(8000, () => console.log('Server is running'))
