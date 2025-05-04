import bookingmodel from "../models/bookings.model.js"
import Rooms from "../models/room.model.js";
import moment from 'moment'


export const booking = async(req,res)=>{
    try {
        const {room,roomid,userid,username,checkin,checkout,totalamount,totaldays}=req.body
        const newbooking = new bookingmodel({
            room: room,
            roomid:roomid,
            userid:userid,
            username:username,
            checkin:checkin,
            checkout:checkout,
            totalamount:totalamount,
            totaldays:totaldays,
            transactionid:'1212125456'
        })
        await newbooking.save();
        const tempRoom = await Rooms.findOne({_id:roomid})

        //Handling currentbookings
        if(tempRoom)
        tempRoom.currentbookings.push({room:room,roomid:roomid,userid:userid,username:username,checkin:checkin,checkout:checkout});
        await tempRoom.save();
        console.log(tempRoom)

        res.status(201).json({message:"Booking created Succesfully !"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error !"});
    }

}


export const getUserBookings = async(req,res)=>{
        try {
          const bookings = await bookingmodel.find();
          res.send(bookings);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }

}


export const cancelBookings = async(req,res)=>{
    

    try {
    const {bookingid} = req.body;
    console.log(bookingid)
      const bookings = await bookingmodel.findOne({_id:bookingid});
      console.log(bookings)
      if(bookings) {
        if(bookings.status==='Booked')
        {
            bookings.status='Cancelled';
            await bookings.save();
            res.status(200).json({ message: "Booking Cancelled" });
        }
        else{
            res.status(400).json({ message: "Booking already cancelled" });
        }
        
        
      }else{
        res.status(404).json({ message: "Booking not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

}
