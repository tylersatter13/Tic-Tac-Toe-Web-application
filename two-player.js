/**
 * Created by tylersatter on 7/2/17.
 */
$(document).on( "pagecreate","#gameboard2",function() {
   console.debug("A");
//   var onePlayer = chooseLevel(2);

 //   onePlayer.player2Name="Computer";



});
$(document).on("pageshow", "#gameboard2", function(){
    console.debug("b");
   var game1;
   $("#gameSetup").popup("open");

   $(".submit").on("tap", function() {
       var player1 = $('#playerOneName').val();
       var player2 = $('#playerTwoName').val();
       game1 = new Game(player1, player2);
        $("#playerid").text( this.player1Name);
   });
  $(".tap").on("tap",function(){

  game1.getPlayerNumber(this);

  });
 $("a.reset").on("tap",function() {
        game1.restGame();
    });

 });
