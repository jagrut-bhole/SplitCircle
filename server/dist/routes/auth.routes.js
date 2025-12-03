import { Router } from 'express';
import { loginController } from '../controllers/user.controllers.js';
const authRouter = Router();
authRouter.use('/login', loginController);
export { authRouter };
//# sourceMappingURL=auth.routes.js.map