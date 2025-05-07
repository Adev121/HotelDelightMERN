import express from 'express'
import { payment } from '../controller/payment.controller.js'

const router = express.Router()

router.post('/payment',payment);

export default router