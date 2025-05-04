import express from 'express'
import {signup,login, getAllUser} from '../controller/user.controller.js'

const router = express.Router()

router.post('/signup',signup);
router.post('/login',login);
router.get('/getUsers',getAllUser);

export default router;