import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import errorMiddleware from './middlewares/error-middleware.js'
import router from './routes/index.js'
import fileUpload from 'express-fileupload'

dotenv.config()
const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({}))
app.use(express.static('images'))
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log(`Запущено на порту ${PORT}`))
  } catch (error) {
    console.log('Ошибка запуска')
  }
}

start()
