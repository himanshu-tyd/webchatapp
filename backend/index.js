import express, { json } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './database/connect.js'
import authRouter from './routes/authRoute.js'
import messsageRouter from './routes/messageRoute.js'
import usersRouter from './routes/usersRoute.js'

const app=express()

dotenv.config()

const PORT=process.env.PORT || 8000


//TODO:MIDDLWARES

app.use(express.json()) //TODO: To parse the incoming request with JSON payloads from (req.body)
app.use(cookieParser({origin:true})) // TODO: TO access the cookie  
app.use('/api/auth',authRouter)
app.use('/api/messages',messsageRouter)
app.use('/api/users',usersRouter)

app.listen(8000,()=>{
    console.log(`SERVER IS RUNNING AT ${PORT} `)
    connectDB();
})
