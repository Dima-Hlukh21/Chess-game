const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')

app.use(express.json()) 

const DB_URL = 'mongodb+srv://ChessRoot:7Ms7nOs1UGliAC4a@cluster0.rhguy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, UseNewUrlParser: true })
        app.listen(3333, () => {
            console.log('Application listening on port 3333!')
        })
    } catch (e) {
        console.log(e)
    }
}



app.use('/api/auth', require('./routers/authRouter'));

app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

startApp()