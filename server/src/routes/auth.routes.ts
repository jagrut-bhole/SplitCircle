import {Router} from 'express'
import { loginController, logoutController, refreshAccesssToken, registerController } from '../controllers/user.controllers.js'
import { jwtVerify } from '../middlewares/auth.middlewares.js';

const authRouter:Router = Router()

authRouter.use('/register', registerController);
authRouter.use('/login',loginController);
authRouter.use('/refresh',refreshAccesssToken);

// authenticated routes
authRouter.use('/logout',jwtVerify,logoutController);

export {authRouter}