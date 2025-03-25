import express from 'express';
import 'dotenv/config';
import { ResponseModel } from './interfaces/ResponseModel.js';
import { authRouter } from './routes/auth.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.get('/hello', (req, res, next) => {
    const result: ResponseModel = {
        ok: true,
        message: 'Hello World!',
    };
    res.json(result);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
