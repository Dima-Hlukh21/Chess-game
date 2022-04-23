import { Router } from 'express';
import { check } from 'express-validator';
import controller from './authController.js';
import authMiddleware from '../middlewaree/authMiddleware.js';
const authRouter =  new Router()


authRouter.post('/login', controller.login)

authRouter.post('/register', [
    check('username', "Поле не может быть пустым").notEmpty(),
   check('password', " Пароль должен быть больше 4 и меньше 12 символов").isLength({min:4, max:12})
],  controller.registration)

authRouter.get('/events')


export default authRouter;
