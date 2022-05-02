import GameManager from '../models/GameManager.js'
import {io} from '../index.js'


const Game = new GameManager()  // Головний об'єкт гри

export default function (socket){ console.log('User connected'); 
    socket.on('start', (data) => {                          // { user, white }      
        if (Game.users[socket.id] !== undefined) return;    // Перевірка що гравець ще не в грі
        Game.start({ id: socket.id.toString(), ...data }, (start, gameId, opponent, gameBoard) => {     
            if (start) {                                    // Перевірка початку гри
                socket.join(gameId);                         // Створення кімнати гри для гравців                      
                io.in(opponent).socketsJoin(gameId);
                socket.emit('ready', {gameId, gameBoard});               // Повідомлення гравців про початок
                io.to(opponent).emit('ready', {gameId, gameBoard});
                console.log(Game.games[gameId].visibilityBoard());
                console.log(Game.games[gameId].boardToConsole());
            } else {
                io.to(socket.id).emit('wait');
            }
        }) 
    })
    socket.on('step', (data) => {                           // { gameId,  from,  to }
    const gameStep = Game.games[data.gameId].step(data.from, data.to);
    if  (gameStep != null) {
        if (gameStep.captured == 'k' || gameStep.captured == 'K'){
            io.to(Game.games[data.gameId].getUserId()).emit('gameOver', {gameBoard});
            io.to(Game.games[data.gameId].getOpponentrId()).emit('gameOver', {gameBoard});
            return;
        };
            io.to(Game.games[data.gameId].getUserId()).emit('upDateBoard', {gameBoard});
            io.to(Game.games[data.gameId].getOpponentrId()).emit('upDateBoard', {gameBoard});
        }
    })
}