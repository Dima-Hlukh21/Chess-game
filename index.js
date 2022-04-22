const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server,{ cors: { origin: '*' }});
const path = require('path');
const mongoose = require('mongoose')
const ChessGame = require('./models/ChessGame')


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


const Game = new ChessGame()  // Головний об'єкт гри

io.on('connection', socket =>{
    console.log('User connected')   

    socket.on('start', () => {      
        if (Game.users[socket.id] !== undefined) return;    // Перевірка що гравець ще не в грі
        Game.start(socket.id.toString(), (start, gameId, opponent) => {     
            if (start) {                                    // Перевірка початку гри
                socket.join(gameId)                         // Створення кімнати гри для гравців                      
                io.in(opponent).socketsJoin(gameId)
                socket.emit('ready', gameId)                // Повідомлення гравців про початок
                io.to(opponent).emit('ready', gameId)
            } else {
                io.to(socket.id).emit('wait')
            }
        }) 
    })
}) 

app.use('/api/auth', require('./routers/authRouter'));

app.use('/', require('express').static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});


startApp()