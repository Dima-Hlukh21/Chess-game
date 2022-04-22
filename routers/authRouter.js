const { Router } = require('express')
const controller = require('./authController')
const {check} = require("express-validator")
const authRouter =  new Router()
const authMiddleware = require('../middlewaree/authMiddleware')


authRouter.post('/login', controller.login)

authRouter.post('/register', [
    check('username', "Поле не может быть пустым").notEmpty(),
   check('password', " Пароль должен быть больше 4 и меньше 12 символов").isLength({min:4, max:12})
],  controller.registration)

authRouter.get('/events')


module.exports = authRouter
