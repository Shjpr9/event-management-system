import express from 'express';
import { register } from '../auth/register.js';
import { login } from '../auth/login.js';
import { assignUser } from '../middlewares/assignUser.js';
import { getUser } from '../auth/getUser.js';
import { deleteUser } from '../auth/delete.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', assignUser, getUser);
router.delete('/user/:id', assignUser, deleteUser);

export { router as authRouter };
