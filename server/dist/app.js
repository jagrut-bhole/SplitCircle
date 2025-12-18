import express from 'express';
import cors from 'cors';
import dotnev from 'dotenv';
dotnev.config({
    path: "./.env"
});
import cookieParser from 'cookie-parser';
//routes login
import { authRouter } from './routes/auth.routes.js';
import { userRouter } from './routes/user.routes.js';
import { groupRouter } from './routes/group.routes.js';
import { expenseRouter } from './routes/expense.routes.js';
import { settlementRouter } from './routes/settlement.routes.js';
//
const app = express();
// const allowedOrigins  : string[] = [
//     'https://splitcircle.jagrut.me'
// ]
// app.use(cors({
//     origin : function (origin , callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, origin || allowedOrigins[0])
//         } else {
//             callback(new Error('Not allowed by CORS!!'));
//         }
//     },
//     credentials : true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: ['Set-Cookie']
// }))
const corsOrigin = process.env.CORS_ORIGIN;
console.log("CORS ORIGIN ", corsOrigin);
app.use(cors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
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
//Routes setup - MUST come before the generic root route
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/group', groupRouter);
app.use('/api/v1/expense', expenseRouter);
app.use('/api/v1/settlement', settlementRouter);
//
app.get('/', (req, res) => {
    res.send("Welcome to SplitCircle");
});
export default app;
//# sourceMappingURL=app.js.map