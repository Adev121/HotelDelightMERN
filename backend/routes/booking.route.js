import express from 'express'
import { booking, cancelBookings, getUserBookings } from '../controller/booking.controller.js'
const router=express.Router()

router.post('/bookings',booking)
router.get('/getUserBookings',getUserBookings );
router.post('/cancelBooking',cancelBookings );


export default router;