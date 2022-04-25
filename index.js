import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import ChessGame from './models/ChessGame.js'
import authRouter from './routers/authRouter.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{ cors: { origin: '*' }});

app.use(express.json()) 
app.use(cors()) 

const DB_URL = 'mongodb+srv://ChessRoot:7Ms7nOs1UGliAC4a@cluster0.rhguy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const Game = new ChessGame()  // Головний об'єкт гри

io.on('connection', socket =>{ console.log('User connected'); 
    socket.on('start', (data) => {                          // { user, white }      
        if (Game.users[socket.id] !== undefined) return;    // Перевірка що гравець ще не в грі
        Game.start({ id: socket.id.toString(), ...data }, (start, gameId, opponent, gameBoard) => {     
            if (start) {                                    // Перевірка початку гри
                socket.join(gameId)                         // Створення кімнати гри для гравців                      
                io.in(opponent).socketsJoin(gameId)
                socket.emit('ready', {gameId, gameBoard})                // Повідомлення гравців про початок
                io.to(opponent).emit('ready', {gameId, gameBoard})
            } else {
                io.to(socket.id).emit('wait')
            }
        }) 
    })
    socket.on('step', (data) => {                           // { gameId,  from,  to }
       const gameStep = Game.games[data.gameId].step(data.from, data.to)
        if  (gameStep != null) {
            io.to(Game.games[data.gameId].getUserId()).emit('upDateBoard', {gameBoard})
            io.to(Game.games[data.gameId].getOpponentrId()).emit('upDateBoard', {gameBoard})
        }
    })
}) 

app.use('/api/auth', authRouter);

app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, UseNewUrlParser: true })
        httpServer.listen(3333, () => {
            console.log('Application listening on port 3333!')
        })
    } catch (e) {
        console.log(e)
    }
}
startApp()