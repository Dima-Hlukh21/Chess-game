import  GameItem  from './GameItem.js'



export default  class GameManager{
    constructor() {
        this.games = [];    // Масив створених ігор
        this.users = [];    // Масив гравців
        this.free = [];     // Черга
    }
    start(userData, callback) {
        this.users[userData.id] = userData; 
        const opponent = this.free.find( user => user.white != userData.white );        // пошук опонентка з черги

        if (opponent){ 
            this.free = this.free.filter((item) => item.id !== opponent.id);             // видаляємо опонента з черги                            
            const game = new GameItem(userData, opponent);                              // Створюємо об'єкт гри 
            //console.log(game);
            //console.log(game.getBoard())
            const id = Date.now();
            this.games[id] = game                                                          // додаємо гру в загальний масив ігор
            this.users[userData.id].game = id                                               // присвоюємо гравцям ІД їхньої гри
            this.users[opponent.id].game = id
            callback(true, id, opponent.id, game.getBoard());                                       // Првернення данних з функії
            console.log('user1: '+ JSON.stringify(userData) + ' user2: '+ JSON.stringify(this.users[opponent.id]) )
        } else{     
            this.free.push({id: userData.id, white: userData.white });                      // постанова в чергу
            console.log('User add to quiue '+ JSON.stringify( this.users[userData.id]))
            callback(false);
        };     
    };
};