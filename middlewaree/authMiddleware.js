import jwt from 'jsonwebtoken';
import {secret} from '../config/config.js';


export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "ПОльзователь не авторизирован"})
        }
        const decodeData =jwt.verify(token, secret)
        req.user = decodeData
        next()
    } catch (e){
        console.log(e)
        return res.status(403).json({message: "ПОльзователь не авторизирован"})
    }
}