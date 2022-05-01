import { Chess } from './chess.js';


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
    visibilityBoard(){
        const possibleMovesW = [];
        const possibleMovesB = [];
        this.getBoard().map((item,index) => {
            item.map((cell,index) => {
                if(cell == null) return;
                if (cell.color = "w"){
                    possibleMovesW.push(...this.gameModule.moves({scuare: cell.square}) )
                } else{
                    possibleMovesB.push(...this.gameModule.moves({scuare: cell.square}) ) 
                };
            });
        } )
        const possibleMovesWfiltred = possibleMovesW.filter((element, index) => {
            return possibleMovesW.indexOf(element) === index;
        });
        const possibleMovesBfiltred = possibleMovesB.filter((element, index) => {
            return possibleMovesB.indexOf(element) === index;
        });
        return possibleMovesWfiltred;
    }
    boardToConsole(){
        return this.gameModule.ascii()
    }
    step(from, to){
        return this.gameModule.move({from,to})
    }
     getUserId(){
         return this.user
     }
     getOpponentrId(){
        return this.opponent
    }
    getTurn(){

    }
    checkWinner(){
        
    }

}
