import express from 'express';
import 'dotenv/config';
import { authRouter } from './routes/auth.js';
import { globalErrorHandler } from './middlewares/errorHandler.js';
import { eventsRouter } from './routes/events.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalErrorHandler);

app.use('/auth', authRouter);
app.use('/events', eventsRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
