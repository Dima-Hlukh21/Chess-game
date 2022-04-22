const GameItem = require('./GameItem')


module.exports = class ChessGame{
    constructor() {
        this.games = [];    // Масив створених ігор
        this.users = [];    // Масив гравців в іграх
        this.free = [];     // Черга гравців
    }
    start(user, callback) {
        if (Object.keys(this.free).length > 0 && this.free[user] != true){      // Перевірка черги (чи є хтось в черзі і чи це той же гравець)
            const opponent = Object.keys(this.free).shift();                    // Беремо опонента з черги
            delete this.free[opponent];                                         // Видалення опонента з черги                   
            const game = new GameItem(user, opponent)                           // Створюємо об'єкт гри
            const id = Date.now();
            this.games[id] = game
            this.users[user] = id
            this.users[opponent] = id
            callback(true, id, opponent);                                       // Првернення данних з функії
            console.log('user1: '+ user + ' user2: '+ opponent )
        } else{
            console.log('User add to quiue '+ user)
            this.free[user] = true;
            callback(false);
        }
        
    }


}