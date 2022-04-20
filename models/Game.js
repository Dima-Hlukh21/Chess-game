


module.exports = class ChessGame{
    constructor() {
        this.games = [];
    // Массив подключённых пользователей = id игры
        this.users = [];
    // Массив пользователей ожидающих оппонентов для начало игры
        this.free = [];
    }
    start(user, callback) {
        if (Object.keys(this.free).length > 0 && this.free[user] != true){
            const opponent = Object.keys(this.free).shift();
            delete this.free[opponent];
            console.log('user1: '+ user + ' user2: '+ opponent )
            console.log(this.free)
        } else{
            console.log('User add to quiue '+ user)
            this.free[user] = true;
            callback(false);
        }
        
    }


}