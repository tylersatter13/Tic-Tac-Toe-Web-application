/**
 * Created by tylersatter on 7/1/17.
 */

var Game = function (player1,player2) {
console.debug(player1);
console.debug(player2);
    console.debug("The game constructor called");
    this.gameboard= new Array(9);
    this.player1Name = player1;
    this.player2Name = player2;
    this.turnCounter = 1;
    this.header = document.getElementById("#playerid");
};

Game.prototype.getPlayerNumber = function (btnObj) {
    var position = parseInt(btnObj.id.substr(3,4));
 console.debug(position);
    var peiceColor = "";
    var peiceSymbol = "";
    var turncolor = "";
    var headername = ""
    var currentPlayerName="";
	console.debug(currentPlayerName);

	 
    if (this.turnCounter === 1) {
      //  console.debug("Player 1 move");
        this.turnCounter = 2;
        peiceColor = "red";
        peiceSymbol = "X";
        turncolor = "blue";
        headername = this.player2Name;
        currentPlayerName=this.player1Name;


    } else if (this.turnCounter === 2) {
        console.debug("Player 2 move");
        this.turnCounter = 1;
        peiceColor = "blue";
       peiceSymbol = "O";
       turncolor = "red";
        headername = this.player1Name;
       currentPlayerName=this.player2Name;
    }

    $(btnObj).text(peiceSymbol);
    $(btnObj).css("color", peiceColor);
    $("#playerid").text(headername+"'s turn").css("color",turncolor);
   // this.header.text= currentPlayerName+"'s Turn";
  //  this.header.color="turncolor";
    this.gameboard[position-1]=peiceSymbol;
   // console.debug(this.gameboard[position-1]);
    this.potentialWinOrganizer(this.gameChecker(position),currentPlayerName)

};

Game.prototype.gameChecker = function(move){//horizontal wins
   var moves = new Array(12);
   console.debug(move);
   switch(move){
       case 1:
       case 2:
       case 3:
           moves[0]=1;
           moves[1]=2;
           moves[2]=3;
           break;
       case 4:
       case 5:
       case 6:
           moves[0]=4;
           moves[1]=5;
           moves[2]=6;
           break;
       case 7:
       case 8:
       case 9:
           moves[0] = 7;
           moves[1] = 8;
           moves[2] = 9;
           break;
   }
    switch (move) { //vertical wins
        case 1:
        case 4:
        case 7:
            moves[3] = 1;
            moves[4] = 4;
            moves[5] = 7;
            break;
        case 2:
        case 5:
        case 8:
            moves[3] = 2;
            moves[4] = 5;
            moves[5] = 8;
            break;
        case 3:
        case 6:
        case 9:
            moves[3] = 3;
            moves[4] = 6;
            moves[5] = 9;
            break;
    }
    switch (move) {
        case 1:
        case 9:
            moves[6] = 1;
            moves[7] = 5;
            moves[8] = 9;
            break;
        case 5:
            moves[6] = 1;
            moves[7] = 5;
            moves[8] = 9;
            moves[9] = 3;
            moves[10] = 5;
            moves[11] = 7;
            break;
        case 7:
        case 3:
            moves[6] = 3;
            moves[7] = 5;
            moves[8] = 7;
            break;

    }

    if (move != 1 && move !=9 && move !=5 && move != 7 && move !=3){

           moves.splice(6,11);
      //  console.debug(moves.length);

    } else if (move === 1 || move === 9 || move === 7 || move === 3){
        moves.splice(9,11);
        //console.debug(moves.length);
    }

   return moves;

};
Game.prototype.potentialWinOrganizer= function(moves, currentplayername) {
   console.log("game did enter");
   console.log(currentplayername);
    var continueGame = true;
     if (this.checkGame(moves[0],moves[1],moves[2], currentplayername) === true){
         this.popupDialog(currentplayername +" Wins");
     }
     if(this.checkGame(moves[3],moves[4],moves[5], currentplayername) === true){
         this.popupDialog(currentplayername +" Wins");
     }
     if (moves.length === 9){
      if(this.checkGame(moves[6],moves[7], moves[8], currentplayername) === true){
          this.popupDialog(currentplayername +" Wins");
      }
     }else if (moves.length === 12){
        if(this.checkGame(moves[9],moves[10],moves[11], currentplayername)=== true){
            this.popupDialog(currentplayername +" Wins");
        }
    }

    if(this.isBoredFull(this.gameboard)=== true){
        this.popupDialog("Its a draw");
    }
};
Game.prototype.isBoredFull = function(board) {

    for (i=0; i< board.length; i++){
        if (board[i]=== undefined){
          //  console.log("there are still empty spaces");
            return false;

        }
    }
    //console.debug("The bored is full");
    return true;
};
Game.prototype.checkGame= function( left, middle, right) {

    if (this.gameboard[left -1] === this.gameboard[middle-1] && this.gameboard[left-1] === this.gameboard[right -1] && this.gameboard[left -1] !== undefined){
    //    console.debug(this.gameboard[left-1]+"-"+this.gameboard[middle-1]+"-"+this.gameboard[right-1]);
      //  console.debug("Win");
        return true;
    }else{
     //   console.debug(this.gameboard[left-1]+"-"+this.gameboard[middle-1]+"-"+this.gameboard[right-1]);
        return false;
      //  console.debug("The Game continues");
    }

};
Game.prototype.popupDialog= function(message) {

    console.log("pop up attempt");
    $("#diaglogMessage").text(message);
  //  $.mobile.changePage("#myDialog",{role:"dialog"});
    $("#myPopupDialog").popup("open");
};

Game.prototype.restGame = function() {
    for(i = 1; i <= 9 ; i++){
        this.gameboard[i-1]=undefined;
        var idTxt = "#btn"+i.toString();
        $(idTxt).text("");

    }

};