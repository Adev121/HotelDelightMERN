import mongoose from  'mongoose'
const bookingSchema = mongoose.Schema({
    room:{
        type:String,
        required:true
    },
    roomid:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    checkin:{
        type:String,
        required:true
    },
    checkout:
    {
        type:String,
        required:true
    },
    totalamount:{
        type:Number,
        required:true
    },
    totaldays:{
        type:Number,
        required:true
    },
    transactionid:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'Booked'
    }
},{
    timestamps:true
})

const bookingmodel = mongoose.model("Bookings",bookingSchema);

export default bookingmodel;