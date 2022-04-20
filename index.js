const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server,{ cors: { origin: '*' }});
const path = require('path');
const mongoose = require('mongoose')
const ChessGame = require('./models/Game')


app.use(require('express').json()) 
app.use(require('cors')()) 

const DB_URL = 'mongodb+srv://ChessRoot:7Ms7nOs1UGliAC4a@cluster0.rhguy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, UseNewUrlParser: true })
        server.listen(3333, () => {
            console.log('Application listening on port 3333!')
        })
    } catch (e) {
        console.log(e)
    }
}


const games = [], Game = new ChessGame()

io.on('connection', socket =>{
    console.log('User connected')
    socket.on('searchGame', data =>{
        games.push(data)
        console.log(games)
        socket.emit('onQuiue', {
          })
    })
    socket.on('start', () => {
        if (Game.users[socket.id] !== undefined) return;
        Game.start(socket.id.toString(),() => {
            
        }) 
    })
}) 

app.use('/api/auth', require('./routers/authRouter'));

app.use('/', require('express').static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});


startApp()