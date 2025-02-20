import express from "express"
import {allUsers, login, logout, SignUp} from "../controller/userController.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post('/signup' , SignUp)
router.post('/login' , login) 
router.post('/logout' , logout)
router.get('/getUserProfile', secureRoute , allUsers)


export default router