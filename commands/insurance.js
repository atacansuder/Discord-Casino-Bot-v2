const fs = require("fs");

exports.run = (client, message, args) => {
    if(client.players[message.author.id].blackjack.canBetInsurance === 0 || client.players[message.author.id].blackjack.isPlaying === 0) return;

    var playerBet = client.players[message.author.id].blackjack.bet;
    var dealerHand = client.players[message.author.id].blackjack.dealerHand;

    var messageString = "The insurance bet has been placed. The dealer will now check if they have a blackjack.";
    if(calculateHand(dealerHand) === 21){
        messageString += "\nThe dealer has blackjack. (**" + dealerHand + "**). You earned " + Math.round(playerBet/2) * 2 + "$.";
        client.players[message.author.id].userdata.points += Math.round(playerBet/2) * 2;
        client.players[message.author.id].blackjack.canBetInsurance = 0;
        client.players[message.author.id].blackjack.isPlaying = 0;
        client.players[message.author.id].blackjack.bet = 0;
        client.players[message.author.id].blackjack.hand = [];
        client.players[message.author.id].blackjack.dealerHand = [];
    }
    else{
        messageString += "\nThe dealer does not have blackjack. You lost your insurance bet. Type **>hit**, **>doubledown** or **>stand** to continue.";
        client.players[message.author.id].userdata.points -= Math.round(playerBet/2);
        client.players[message.author.id].blackjack.canBetInsurance = 0;
    }
    message.channel.send(messageString);
    fs.writeFile(client.config.players_loc, JSON.stringify(client.players, null, 4), function (err) {
        if (err) {
          console.log(err);
        }
    });
    return;
}


function calculateHand(hand){
    var cardNumber = hand.length;
    var handSize = 0;
    var ace = false;

    for(var i = 0; i < cardNumber; i++){
        if(hand[i] === "A"){
            handSize += 1;
            ace = true;
        }
        
        else if(hand[i] === "K" || hand[i] === "Q" || hand[i] === "J"){
            handSize += 10;
        }
        else{
            handSize += parseInt(hand[i]);
        }

    }

    if(ace === true && handSize + 10 < 22){
        handSize += 10;
    }

    return handSize;
}