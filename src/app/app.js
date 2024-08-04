import express from 'express'
import { constant } from './config/constant.js'
import ConnectDB from './config/db.js'
import authRouter from './routes/authRoute.js'

const app = express()
const port = constant.PORT

ConnectDB()

app.use(express.json())


// APIs
app.use('/api/auth/', authRouter)


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})