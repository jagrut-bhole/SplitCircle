import express,{Express,Request,Response} from 'express'
import cors from 'cors'
import dotnev from 'dotenv'
dotnev.config({
    path: "./.env"
});
import cookieParser from 'cookie-parser';

//routes login
import { authRouter } from './routes/auth.routes.js';
import { userRouter } from './routes/user.routes.js';
import { groupRouter } from './routes/group.routes.js';
import { expenseRouter } from './routes/expense.routes.js';
import {settlementRouter} from './routes/settlement.routes.js';
//

const app:Express = express();

app.set("trust proxy", 1);

const corsOrigin = process.env.CORS_ORIGIN;

app.use(cors({
    origin: corsOrigin,
    credentials : true,
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
app.use('/health',(req:Request,res:Response) => {
    res.json({
        message: "Api running fine!!!",
        status: 200
    })
});

//Routes setup 
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/group',groupRouter);
app.use('/api/v1/expense',expenseRouter);
app.use('/api/v1/settlement',settlementRouter);
//


app.get('/' , (req :  Request,res:Response) => {
    res.send("Welcome to SplitCircle");
} )

export default app;