import { Chess } from 'chess.js';


export default  class GameItem{
    constructor(user, opponent){
        this.gameModule = new Chess();
        this.user = user;   //Гравець 1
        this.opponent = opponent;   //Гравець 2
        this.turn = 10; // 10-білі, 20-чорні
    }
    getBoard(){
        return this.gameModule.board()
    }
    step(){

    }
    getTurn(){

    }
    checkWinner(){
        
    }

}
