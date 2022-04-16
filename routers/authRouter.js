const { Router } = require('express');

const authRouter = Router();

authRouter.post('/login', (req, res) => {
    res.status(200).json()
});
authRouter.post('/register', (req, res) => {
    res.status(200).json()
});

module.exports = authRouter
