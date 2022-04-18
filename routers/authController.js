const User = require('../models/Users')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require("../config/config")

const generateAccessToken = (id)=>{
    const payload = {
        id
    }
    return jwt.sign(payload,secret, {expiresIn: "24h"})
}

class autController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Registration error", errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "User with this name already exists"})
            }
            const user = new User({username, password})
            await user.save()
            return res.status(200).json({message: "All good, new user register"})
        } catch(e) {
        res.status(400).json({message: 'Global registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user) {
                return res.status(400).json({message: 'Пользователь ${username} не найден'})
            }
            const validPassword = password
            if (!validPassword){
                return res.status(400).json({message: 'Неверный пароль'})
            }
           const token = generateAccessToken(user._id)
           return res.status(200).json({token})
        } catch(e) {
         res.status(400).json({message: 'Login error'})  
        }

    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch(e) {
            
        }

    }

}
module.exports = new autController()