import { Chess } from './chess.js';


export default  class GameItem{
    constructor(user, opponent){
        this.gameModule = new Chess();
        this.user = user;   //Гравець 1
        this.opponent = opponent;   //Гравець 2     
        this.possibleMovesW = [];
        this.possibleMovesB = [];
        this.nextStep = user.white == true ? user.id : opponent.id;   
    };

    getBoard(){
        const gameboard = this.gameModule.board() 

        this.visibilityBoard()

        function createBord() {      
            return ( 
                gameboard.map((value, index) => {
                    return row(value, index)
                })          
            )
        }
        function row(boardRowData, rowIndex) {
            return boardRowData.map((value, index) => {
                return cell(value, index, rowIndex )
            })  
        }

        const cell = (boardCellData, cellIndex, rowIndex) => {

            let letters = 'abcdefgh'
            let numb = '87654321'
            let square, color, type, visibleForW = false, visibleForB = false;
          
            if(boardCellData) { square = boardCellData.square; color = boardCellData.color; type = boardCellData.type; }
            else {square = letters[cellIndex]+numb[rowIndex]; color = 'none'; type = 'empty';}

            this.possibleMovesW.map((element, index)=>{
                if(element == square || color == 'w') visibleForW = true;
            })
            this.possibleMovesB.map((element, index)=>{
                if(element == square || color == 'b') visibleForB = true;
            })
          
            return { square, type, color, visibleForW, visibleForB }
        }     
          
        return createBord()
    };

    visibilityBoard(){
        const possibleMovesWnotFiltred = []
        const possibleMovesBnotFiltred = []

        this.gameModule.board().map((item,index) => {
            item.map((cell,index) => {
                if(cell == null) return;
                if (cell.color == "w"){
                    possibleMovesWnotFiltred.push(...this.gameModule.moves({scuare: cell.square}) )
                } else{
                    possibleMovesBnotFiltred.push(...this.gameModule.moves({scuare: cell.square}) ) 
                };
            });
        } );

        this.possibleMovesW = possibleMovesWnotFiltred.filter((element, index) => {
            return possibleMovesWnotFiltred.indexOf(element) === index;
        });
        this.possibleMovesB = possibleMovesBnotFiltred.filter((element, index) => {
            return possibleMovesBnotFiltred.indexOf(element) === index;
        });        
    };
    getPossibleMoves(square){
        return this.gameModule.moves({square: square})
    };    
    step(from, to){
        this.nextStep = (this.nextStep == this.opponent.id) ? this.user.id : this.opponent.id;
        return this.gameModule.move({from,to});
    };
    getUserId(){
        return this.user.id
     };
    getOpponentrId(){
        return this.opponent.id
    };
    boardToConsole(){
        return this.gameModule.ascii()
    };
    getTurn(){

    };
    checkWinner(){
        
    };

};
