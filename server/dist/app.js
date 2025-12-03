import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//routes login
import { authRouter } from './routes/auth.routes.js';
//
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    // credentials:true
}));
app.use(express.json({
    limit: '20kb'
}));
app.use(express.urlencoded({
    limit: '20kb',
    extended: true
}));
app.use(express.static('public'));
app.use(cookieParser());
// api checking
app.use('/health', (req, res) => {
    res.json({
        message: "Api running fine!!!",
        status: 200
    });
});
//Routes setup
app.use('/api/v1/auth', authRouter);
//
export default app;
//# sourceMappingURL=app.js.map