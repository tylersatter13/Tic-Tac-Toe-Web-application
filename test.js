/**
 * Created by tylersatter on 7/4/17.
 */
//obects_________________________
//intialize players objects

function chooseLevel (level,playerName) {
  console.debug(playerName);
    if(level === 1){
        console.debug("Level Set to 1");
        $("#mode").text("Easy").css("color","green");
        return new onePlayerEasy(playerName);
    }else if(level===2){
        console.debug("Level Set to 2");
        $("#mode").text("Medium").css("color","orange");
        return new onePlayerMedium(playerName);

    }else if (level===3){
        console.debug("Level Set to 3");
        $("#mode").text("Hard").css("color","red");
        return new onePlayerHard(playerName);
    }
}
//____________________________Start of Program

$(document).on( "pagecreate","#gameboard",function() {
   console.debug("A");
//   var onePlayer = chooseLevel(2);

 //   onePlayer.player2Name="Computer";
    //this.popupDialog("Hello");


});

$(document).on("pageshow","#gameboard",function(){ // When entering pagetwol./
   console.debug("Hello");
    $("#gameSetup").popup("open");
    var level = 1;
    var onePlayer;
    $(".submit").on("tap",function () {
       var playerName=$("#playerOneName2").val();
       console.debug(playerName);
       console.debug($('input[name="level"]:checked').val());

       level =parseInt($('input[name="level"]:checked').val());
        onePlayer = chooseLevel(level,playerName);

        $("#playerid").text(playerName+"'s Turn").css("color","red");

    });

    $(".tap").on("tap",function(){
        console.debug("Tap made");

        onePlayer.getPlayerNumber(this);
        //console.clear();
    });
    $("a.reset").on("tap",function() {
        console.debug(this.player1Name);
        onePlayer.restGame();
    });

});
/*$(document).on("pagecontainerload",function(event,data){
    this.popupDialog("Hello");
    $(".tap").on("tap",function(){
        console.debug("Tap made");
        onePlayer.getPlayerNumber(this);
        //console.clear();
    });
    $("a.reset").on("tap",function() {
        onePlayer.restGame();
    });
});*/
/*function submit() {
    console.debug("form sent");
}*/
onePlayerObJ.prototype.getPlayerNumber = function (btnObj) {
    Game.prototype.getPlayerNumber.call(this,btnObj);
    console.debug("Get Player did start");

    if(this.turnCounter === 2){
        this.CalculateMove();
    }else{
    //    console.debug("Turn counter equals 1");
    }
};
onePlayerObJ.prototype.CalculateMove = function(){
//   console.debug("Did enter calculate moves");

/*
    console.debug("A");
    this.gameboard[1]="X";
   // console.log("B");
    console.log(this.gameboard[1]);
   // console.log("C");
    this.gameboard[2]= "O";
  //  console.log(this.gameboard[2]);
  //  this.gameboard[3]="O";
  //  console.log(this.gameboard[3]);
    this.gameboard[4]="O";
 //   console.log(this.gameboard[4]);
   // this.gameboard[5]="X";
  //  console.log(this.gameboard[5]);
    this.gameboard[6]="X";
  //  console.log(this.gameboard[6]);
  //  this.gameboard[7]="X";
   // this.gameboard[8]="";
*/


/* this.isBoredFull(this.gameboard);*/

   var potentialMoves = this.FindBestMoveValues();
   // console.debug("Pontential Moves did return");

    console.debug();
    potentialMoves.sort(function(a,b){
        return a.moveScore-b.moveScore || a.depth-b.depth;
    });

    for(i=0; i<potentialMoves.length; i++){
        console.debug("Move "+ potentialMoves[i].postion+ " Has a value of "+ potentialMoves[i].moveScore+" and a depth of "+ potentialMoves[i].depth);
    }
    /*potentialMoves.sort(function(a,b) {
       return a.depth-b.depth;
    });
    for(i=0; i<potentialMoves.length; i++){
        console.debug("Move "+ potentialMoves[i].postion+ " Has a value of "+ potentialMoves[i].moveScore+" and a depth of "+ potentialMoves[i].depth);
    }

    

   //   console.debug(potentialMoves.length);
    //  console.debug("Potential Move values");

*/

    this.getPlayerNumber(this.createBtn(potentialMoves[0].postion));
};

onePlayerObJ.prototype.minMax = function(board,depth,isMax) {
    //console.debug("Min Max Started with depth of " + depth);
   if(isMax){
   //  console.log("Entered Minmax as player");
   }else{
    //   console.log("Enter minmax as computer")
   }

    var potentialMoves = this.AvalibleMoves(board);
    var score = this.hypthitcalCheckGame(board);
   // var best = 0;
    var thedepth = depth;
    var length =potentialMoves.length;

    //  console.log(board.length);
    if (score === -10) {
  // console.debug("Min Minx returned -10" + "Player is " +isMax+ " depth is " + depth);
        return {best:score,depth:depth}
    }else if(score === 10) {
  // console.debug("Min Max Returned 10"+ "Player is " +isMax+ " depth is "+ depth);
        return {best:score,depth:depth};
    }else if (this.isBoredFull(board) === true) {
 //    console.debug("Min Max returned 0"+"Depth is "+ depth);
        return {best:0,depth:depth};
    }


    if (isMax === true) {
        //console.log("Enter in is max");
       var best = -1000;
         var z =0;
         for (z =0; z<length; z++){
             board[potentialMoves[z]]="X";
           //  console.log("Max is recalling MaxMin with a value of false");

         //  console.log("best value hast been returned "+tempBest.toString());
            var tempBest = this.minMax(board,depth+1,false);
        //    console.debug("return minmax as player");
            thedepth = tempBest.depth; //set the return depth in to variable outside loop
             best = Math.max(best,tempBest.best);
         //    console.debug("Temp best is "+ tempBest.best+"Best is" +best);
        //   console.log("board removed potential move "+ potentialMoves[z]);
             board[potentialMoves[z]]= undefined;
         }
       //
         return  {best:best,depth:thedepth};
    } else if (isMax ===false) {
 //      console.log("Did enter min");
        var best = 1000;
         var x = 0;
         
        for ( x = 0; x <length; x++){
            board[potentialMoves[x]]="O";
   //         console.log("Mini max with run as True");
            var tempBest = this.minMax(board,depth+1,true);
           // console.debug("return minmax as computer");

            thedepth = tempBest.depth;
            best = Math.min(best,tempBest.best);
            board[potentialMoves[x]]=undefined;

         //   console.debug("Temp best is "+ tempBest.best+"Best is" +best);
        }
        //console.debug(depth);
        return {best:best,depth:thedepth}
    }

};

onePlayerObJ.prototype.FindBestMoveValues = function(){
 // console.debug("Did enter Find Best Move Value");
    // console.debug(this.AvalibleMoves().length);
//    console.debug("Avaliable Moves collected");

    var  movesScores = [];
    var theboard = this.gameboard;
    var avaliblemoves = this.AvalibleMoves(theboard);
    var w = 0;
    var length =avaliblemoves.length;
   // console.debug("Avaliable moves search did start");
    for( w = 0  ; w < length; w++){
    //   console.debug("Avaliable moves for "+ avaliblemoves[w]+" being calculated");
        theboard[avaliblemoves[w]]="O";
        var varTemp = this.minMax(theboard,0,true);
        movesScores[w] = {
            postion:parseInt(avaliblemoves[w]),
            moveScore:varTemp.best,
            depth: varTemp.depth
        };
        theboard[avaliblemoves[w]]=undefined;// once move has been tested remove from board

  //      console.debug("Move Postion "+movesScores[w].postion + " returned "+ movesScores[w].moveScore+" In "+movesScores[w].depth+" Moves");
   //     console.debug("Avaliable moves for "+ avaliblemoves[w]+" finsihed calculating");
    }
   // console.debug("Avaliable moves search did end");
      return movesScores;
};
onePlayerObJ.prototype.checkGame = function (left,middle,right){
 return this.checkGame2(left,middle,right,this.gameboard);
};
onePlayerObJ.prototype.checkGame2 = function (left,middle, right,board) {
    if (board[left-1]=== board[middle-1] && board[left-1]=== board[right-1] && board[left-1] !== undefined){
        return true;
    } /*if(board[left-])*/
    else{
        return false;
    }
};

onePlayerObJ.prototype.hypthitcalCheckGame = function(board){
v= 1;

    for( v = 1; v<= 7; v+=3) { // check rows
        if (this.checkGame2(v, v+1, v+2, board) === true) {
            if (board[v-1] === "X") {
     //         console.debug("Loss Found in Horizontal Row");
                return 10;
            } else {
        //      console.debug(this.gameboard[v-1]);
      //          console.debug("Win Found in Horizontal Row");
                return -10;
            }
        }
    }
    for (var v = 1; v<=3; v++){
        if (this.checkGame2(v,v+3,v+6,board) === true){
            if(board[v-1]==="X"){
     //           console.debug("Player Win in Vertical Row ");
                return 10;
            }else{
     //           console.debug(board[v-1]);
       //       console.debug("Computer Win in Vertical Row ");
                return -10;
           }
        }
    }
    if ( this.checkGame2(1,5,9,board) === true){
        if(board[0] === "X"){
       //   console.debug("Loss Found Horizontlly 1-5-9");
            return 10;
        }else{
      //     console.debug("Win Found Horizontlly 1-5-9");
            return -10;
        }
    }
    if (this.checkGame2(3,5,7,board) === true){
        if(board[2] === "X"){
    //        console.debug("Loss Found Horizontlly 3-5-7");
            return 10;
        }else{
     //      console.debug("Win Found Horizontlly 3-5-7");
            return -10;
        }
    }
   //  console.debug("No Victory found");
    return 0;
};
onePlayerObJ.prototype.AvalibleMoves = function(board){
    var moves = [];
    var counter = 0;
    // console.debug(this.gameboard[0]);
   // console.debug("A");
    for (var i=0; i < board.length;i++){
        if (board[i] === undefined ){

            moves[counter]=[i];
            // console.debug(moves[counter]);
            //console.debug("Empty space found at space"+i.toString());
            counter++;

        }
      // console.debug("Move "+ i + " equals " + board[i]);
        // console.debug("Space "+i.toString()+"is filled");
    }
   // console.debug(moves.length);
    return moves;
};
onePlayerObJ.prototype.createBtn = function(btnNum){
    var move = btnNum+1;
    console.debug(move);
    var btnID = "btn"+move.toString();
    console.debug(btnID);
    return document.getElementById(btnID);
};
onePlayerObJ.prototype.restGame = function () {
    Game.prototype.restGame.call(this);
    this.turnCounter=1;
};