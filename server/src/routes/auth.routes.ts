import {Router} from 'express'
import { registerController } from '../controllers/user.controllers.js'

const authRouter:Router = Router()

authRouter.use('/register', registerController)

export {authRouter}