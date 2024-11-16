import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './routes/userRoute.js'
import ConnectDB from './config/DB.js'
import carRouter from './routes/carRoute.js'

//app config
const app  = express()
const PORT = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(cors())

//db connection
ConnectDB()

//api endpoints
app.use('/api/user',userRouter)
app.use('/images',express.static('uploads'))
app.use('/api/cars',carRouter)

app.get('/',(req,res)=>{
    res.send("Backend Running");
})



app.listen(PORT,()=>console.log(`Server started at http://localhost:${PORT}`))