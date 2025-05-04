import express from 'express'
import {addRooms, getRooms} from '../controller/room.controller.js'


const router = express.Router()

router.get('/',getRooms)
router.post('/addrooms',addRooms)

export default router