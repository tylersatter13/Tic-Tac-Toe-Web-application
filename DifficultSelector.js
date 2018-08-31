var onePlayerObJ = function(player1){
	console.debug(player1);
    Game.call(this,player1,"Computer");
    this.player2Name = "Computer";
};
onePlayerObJ.prototype = Object.create(Game.prototype);
onePlayerObJ.prototype.constructor = Game;
//_____________________________________________
var onePlayerEasy= function(player1){
	console.debug(player1);
    onePlayerObJ.call(this,player1);
    var gameLevel = "Easy";
};
onePlayerEasy.prototype = Object.create(onePlayerObJ.prototype);
onePlayerEasy.prototype.constructor = onePlayerEasy;
//_____________________________________________

var onePlayerMedium = function (player1) {
    onePlayerObJ.call(this,player1);
    var gamelevel = "Medium"
};
onePlayerMedium.prototype= Object.create(onePlayerObJ.prototype);
onePlayerMedium.prototype.constructor =onePlayerObJ;

//_________________________________________

var onePlayerHard = function(player1) {
    onePlayerObJ.call(this,player1);
    var gameLevel =  "Hard";
};
onePlayerHard.prototype = Object.create(onePlayerObJ.prototype);
onePlayerHard.prototype.constructor = onePlayerObJ;
//