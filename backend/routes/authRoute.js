import express from 'express'
import { singUp ,login, logout} from "../controllers/authControllers.js";
import protectRoute from '../middleware/protectRoute.js';


const router=express.Router()

router.post('/signup',singUp)
router.post('/login',login)
router.post('/logout',protectRoute,logout) // SPACIFICLY WE ARE CALLING THE PROTEDTED MIDDLEWARE SO WE HAVE LOGGED USER ID


export default router


