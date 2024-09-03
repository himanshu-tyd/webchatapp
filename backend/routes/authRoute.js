import express from 'express'
import { singUp ,login, logout} from "../controllers/authControllers.js";


const router=express.Router()

router.post('/signup',singUp)
router.post('/login',login)
router.post('/logout',logout)


export default router


