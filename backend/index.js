import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose';
import roomsRoute from './routes/room.route.js'
import userRoute from './routes/user.route.js'
import bookingroute from './routes/booking.route.js'
import getbookingRoute from './routes/booking.route.js'
import availableRoomsRoute from './routes/booking.route.js'
import cancelbookingRoute from './routes/booking.route.js'
import getAllUserRoute from './routes/user.route.js'
import addroomsRoute from './routes/room.route.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

dotenv.config();

const port = process.env.PORT;
console.log(port)


const uri = process.env.mongoUri;
 mongoose.connect(uri, {useunifiedtopology:true, useNewUrlParser:true})
 .then(()=>{
    console.log("Database connected successfully !")
 })
 .catch((err)=>{
    console.log(err)
 });

 //defining routes

 app.use('/getRooms',roomsRoute);
 app.use('/',userRoute);
 app.use('/',bookingroute);
 app.use('/',availableRoomsRoute);
 app.use('/',getbookingRoute);
 app.use('/',cancelbookingRoute);
 app.use('/',getAllUserRoute);
 app.use('/',addroomsRoute);



app.listen(port,()=>{
    console.log(`Server Running at port ${port}`)
})