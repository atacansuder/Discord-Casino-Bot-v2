const fs = require("fs");

exports.run = (client, message, args) => {
    
    if(client.players[message.author.id].blackjack.isPlaying === 0) return;
    if(client.players[message.author.id].blackjack.canDoubledown === 0) return;
    
    const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "K", "Q"];
    var playerBet = client.players[message.author.id].blackjack.bet;
    var playerHand = client.players[message.author.id].blackjack.hand;
    var dealerHand = client.players[message.author.id].blackjack.dealerHand;
    client.players[message.author.id].blackjack.canBetInsurance == 0
    client.players[message.author.id].blackjack.canDoubledown = 0;

    if(client.players[message.author.id].userdata.points < playerBet){
        message.channel.send("**" + message.author.username + "**, you can't doubledown since you don't have the required amount of money. Try hitting or standing instead.");
        return;
    }

    client.players[message.author.id].blackjack.bet += playerBet;
    client.players[message.author.id].userdata.points -= playerBet;
    playerBet = playerBet * 2;
    playerHand.push(cards[Math.floor(randomNumber() * 11)]);
    playerHandSize = calculateHand(playerHand);

    var messageString = ("**" + message.author.username + "**, your new hand: **" + playerHand + "** (size: " + playerHandSize + ")");

    if(playerHandSize > 21){
        messageString += "\nYour hand exceeded 21, you lost.";
        client.players[message.author.id].blackjack.isPlaying = 0;
        client.players[message.author.id].blackjack.bet = 0;
        client.players[message.author.id].blackjack.hand = [];
        client.players[message.author.id].blackjack.dealerHand = [];
        client.players[message.author.id].blackjack.canDoubledown = 0;
    }
    else{
        var dealerHandSize = calculateHand(dealerHand);
        while(dealerHandSize < 17){
            dealerHand.push(cards[Math.floor(randomNumber() * 11)]);
            dealerHandSize = calculateHand(dealerHand);
        }

        messageString += ("\nThe dealer has finished drawing cards: " + printHand(dealerHand) + " (size: " + dealerHandSize + ")");

        // TODO: Organize the repeated code into one function
        if(dealerHandSize > 21){
            messageString += ("\nThe dealer has exceeded 21! You won " + playerBet * 2 + "$");
            message.channel.send(messageString);
            client.players[message.author.id].userdata.points += playerBet * 2;
            client.players[message.author.id].blackjack.isPlaying = 0;
            client.players[message.author.id].blackjack.bet = 0;
            client.players[message.author.id].blackjack.hand = [];
        }
        else if(dealerHandSize === 21){
            messageString += ("\nThe hand sizes are the same, you got your money back.");
            message.channel.send(messageString);
            client.players[message.author.id].userdata.points += playerBet;
            client.players[message.author.id].blackjack.isPlaying = 0;
            client.players[message.author.id].blackjack.bet = 0;
            client.players[message.author.id].blackjack.hand = [];
            client.players[message.author.id].blackjack.dealerHand = [];
        }
        else if(playerHandSize > dealerHandSize){
            messageString += ("\nCongrats, you have won " + playerBet * 2 + "$");
            message.channel.send(messageString);
            client.players[message.author.id].userdata.points += playerBet * 2;
            client.players[message.author.id].blackjack.isPlaying = 0;
            client.players[message.author.id].blackjack.bet = 0;
            client.players[message.author.id].blackjack.hand = [];
            client.players[message.author.id].blackjack.dealerHand = [];
        }
        else if(playerHandSize < dealerHandSize){
            messageString += ("\nYou lost.");
            message.channel.send(messageString);
            client.players[message.author.id].blackjack.isPlaying = 0;
            client.players[message.author.id].blackjack.bet = 0;
            client.players[message.author.id].blackjack.hand = [];
            client.players[message.author.id].blackjack.dealerHand = [];
        }
        client.players[message.author.id].blackjack.canDoubledown = 1;
        fs.writeFile(client.config.players_loc, JSON.stringify(client.players, null, 4), function (err) {
            if (err) {
              console.log(err);
            }
        });
        return;
    }
    message.channel.send(messageString);
    client.players[message.author.id].blackjack.hand = playerHand;
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


function printHand(hand){
    /*
    var result = "";
    for(var i = 0; i < hand.length; i++){
        if(i !== hand.length - 1){
            result += "**" + hand[i] + "**, ";
        }
        else{
            result += "**" + hand[i] + "**";
        }
    }*/
    return "**" + hand + "**";
}

function randomNumber() {
    return Math.random();
}