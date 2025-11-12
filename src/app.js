import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/health', (req, res) => res.status(200).send('Healthy'))
app.use('/user', userRouter)



app.use(errorHandler)


export default app  