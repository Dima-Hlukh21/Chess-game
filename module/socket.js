import GameManager from '../models/GameManager.js'
import {io} from '../index.js'


const Game = new GameManager()  // Головний об'єкт гри

export default function (socket){ console.log('User connected'); 
    socket.on('start', (data) => {                          // { user, white }      
        if (Game.users[socket.id] !== undefined) return;    // Перевірка що гравець ще не в грі
        Game.start({ id: socket.id.toString(), ...data }, (start, gameId, opponentId, gameBoard) => {     
            if (start) {                                    // Перевірка початку гри
                socket.join(gameId);                         // Створення кімнати гри для гравців                      
                io.in(opponentId).socketsJoin(gameId);
                socket.emit('ready', {gameId, user: Game.users[socket.id.toString()], gameBoard, nextStep: Game.games[gameId].nextStep});               // Повідомлення гравців про початок
                io.to(opponentId).emit('ready', {gameId, user:  Game.users[opponentId], gameBoard, nextStep: Game.games[gameId].nextStep});
            } else {
                io.to(socket.id).emit('wait');
            }
        }) 
    })
    socket.on('step', (data) => {                           // { gameId,  from,  to }
        const gameStep = Game.games[data.gameId].step(data.from, data.to);
        if  (gameStep != null) {            
            const newGameBoard = Game.games[data.gameId].getBoard();
            const userId = Game.games[data.gameId].getUserId();
            const opponentId = Game.games[data.gameId].getOpponentrId();
            console.log( Game.games[data.gameId].boardToConsole())

            if (gameStep.captured == 'k' || gameStep.captured == 'K'){
                io.to(userId).emit('gameOver', {gameBoard: newGameBoard});
                io.to(opponentId).emit('gameOver', {gameBoard: newGameBoard});
                return;
            };
            io.to(userId).emit('upDateBoard', {gameBoard: newGameBoard, nextStep: Game.games[data.gameId].nextStep});
            io.to(opponentId).emit('upDateBoard', {gameBoard: newGameBoard, nextStep: Game.games[data.gameId].nextStep});
        }
    })
    socket.on('possibleMoves', (data) => {                  // { gameId, userId, square }
        const moves = Game.games[data.gameId].getPossibleMoves(data.square);
        io.to(data.userId).emit('possibleMoves', {moves})
    })
}