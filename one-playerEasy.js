
onePlayerEasy.prototype.CalculateMove = function(){
    var avaliableMoves = this.AvalibleMoves(this.gameboard);
    console.debug("Number of avalible move"+avaliableMoves.length);
    var move = Math.floor(Math.random()*avaliableMoves.length);

    var btnNumber= parseInt(avaliableMoves[move])+1;//one is added to match the button labels
    console.debug(btnNumber);
    var btnID = "btn"+btnNumber.toString();
    console.debug(btnID);
    //console.debug(document.getElementById(btnID));
    this.getPlayerNumber(document.getElementById(btnID));
};