import mongoose from 'mongoose'
const roomSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    imageurls:[],
    rentperday:{
        type:String,
        required: true,
    },
    type:{
        type:String,
        required: true,
    },
    maxcount:{
        type:String,
        required: true,
    },
    phonenumber:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    currentbookings:[]
},{
    timestamps: true
})

const Rooms = mongoose.model("RoomsCols",roomSchema)

export default Rooms;