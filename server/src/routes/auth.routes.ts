import {Router} from 'express'
import { 
    changeEmailController, 
    changePasswordController, 
    loginController, 
    logoutController, 
    refreshAccesssToken, 
    registerController, 
    userProfile 
} from '../controllers/auth.controllers.js'

import { jwtVerify } from '../middlewares/auth.middlewares.js';


const authRouter:Router = Router()

authRouter.post('/register', registerController);
authRouter.post('/login',loginController);
authRouter.post('/refresh',refreshAccesssToken);

// authenticated routes
authRouter.post('/logout',jwtVerify,logoutController);
authRouter.patch('/change-email',jwtVerify,changeEmailController);
authRouter.patch('/change-password',jwtVerify,changePasswordController);
authRouter.get('/profile',jwtVerify,userProfile)

export {authRouter}