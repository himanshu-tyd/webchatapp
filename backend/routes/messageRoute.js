import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { getMessages, sendMessage } from "../controllers/messageControllers.js";


const router=express.Router()

router.post('/send/:id',protectRoute,sendMessage)
router.get('/:id',protectRoute,getMessages)

export default router