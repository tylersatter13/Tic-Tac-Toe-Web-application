onePlayerMedium.prototype.CalculateMove = function () {
    var moves = this.FindBestMoveValues();
    var counter = 0;
    var length = moves.length;
    var randomMoves = [];
    var arraycount=0;
    for(counter = 0; counter<length; counter ++){

        if (moves[counter].moveScore === -10){
            randomMoves[arraycount]= moves[counter];
            break;
        }else if (moves[counter].moveScore === 0){
            randomMoves[arraycount]= moves[counter];
            arraycount++;
            randomMoves[arraycount]= moves[counter];
            arraycount++;
        }else if (moves[counter].moveScore === 10){
            randomMoves[arraycount] = moves[counter];
            arraycount++;
        }
    }
   console.debug(randomMoves.length);

  if (randomMoves.length === 1){
        this.getPlayerNumber(this.createBtn(randomMoves[0].position));
  }else{
      var randomMove = Math.floor(Math.random()*randomMoves.length);
      console.debug(randomMove);
      console.debug("Test"+parseInt(randomMoves[randomMove].postion));
      this.getPlayerNumber(this.createBtn(parseInt(randomMoves[randomMove].postion)));
  }


};
