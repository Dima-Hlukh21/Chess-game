import  GameItem  from './GameItem.js'



export default  class GameManager{
    constructor() {
        this.games = [];    // Масив створених ігор
        this.users = [];    // Масив гравців
        this.free = [];     // Черга
    }
    start(userData, callback) {
        this.users[userData.id] = userData; 
        const opponent = this.free.find( user => user.white != userData.white );

        if (opponent){ 
            this.free = this.free.filter((item) => item.id !== opponent.id);                                              
            const game = new GameItem(userData.id, opponent.id);                          // Створюємо об'єкт гри
            const id = Date.now();
            this.games[id] = game
            this.users[userData.id].game = id
            this.users[opponent.id].game = id
            callback(true, id, opponent.id, game.getBoard());                                       // Првернення данних з функії
            console.log('user1: '+ JSON.stringify(userData) + ' user2: '+ JSON.stringify(this.users[opponent.id]) )
        } else{     
            this.free.push({id: userData.id, white: userData.white });
            console.log('User add to quiue '+ JSON.stringify( this.users[userData.id]))
            callback(false);
        }     
    }

}