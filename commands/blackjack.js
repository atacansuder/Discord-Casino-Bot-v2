const fs = require("fs");

exports.run = (client, message, args) => {
    
    if(!argIsValid(client, message, args)) return;
    if(client.players[message.author.id].blackjack.isPlaying === 1) {
        const playerHand = client.players[message.author.id].blackjack.hand;
        const dealerHand = client.players[message.author.id].blackjack.dealerHand;
        message.channel.send("**" + message.author.username + "**, you already have an active blackjack game.\nYour hand: **" + playerHand + "** (size: "+ calculateHand(playerHand) + "), dealer hand: **" + dealerHand[0] + "**");
        return;
    }

    var userpoints = client.players[message.author.id].userdata.points;
    var bet_amount = parseInt(args[0]);
    client.players[message.author.id].userdata.points -= bet_amount;
    client.players[message.author.id].blackjack.isPlaying = 1;
    client.players[message.author.id].blackjack.bet = bet_amount;

    var playerHand = [];
    var dealerHand = [];
    const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "K", "Q"];

    for(var n = 0; n < 2; n++){
        playerHand.push(cards[Math.floor(randomNumber() * 11)]);
        dealerHand.push(cards[Math.floor(randomNumber() * 11)]);
    }

    client.players[message.author.id].blackjack.hand = playerHand;
    client.players[message.author.id].blackjack.dealerHand = dealerHand;

    var playerHandSize = calculateHand(playerHand);
    var dealerHandSize = calculateHand(dealerHand);

    var messageString = ("**" + message.author.username + "**, your hand: **" + playerHand[0] + "**, **" + playerHand[1] + "** (size: "+ playerHandSize + "), dealer hand: **" + dealerHand[0] + "**");
    
    if(playerHandSize === 21){
        messageString += ("\nBlackjack! You earned " + bet_amount * 3 + "$!");
        message.channel.send(messageString);
        client.players[message.author.id].userdata.points += bet_amount * 3;
        client.players[message.author.id].blackjack.isPlaying = 0;
        client.players[message.author.id].blackjack.bet = 0;
        client.players[message.author.id].blackjack.hand = [];
        client.players[message.author.id].blackjack.dealerHand = [];
    }
    else if(dealerHandSize === 21){
        messageString += ("\nThe dealer has a blackjack! Game over.");
        message.channel.send(messageString);
        client.players[message.author.id].blackjack.isPlaying = 0;
        client.players[message.author.id].blackjack.bet = 0;
        client.players[message.author.id].blackjack.hand = [];
        client.players[message.author.id].blackjack.dealerHand = [];
    }
    else{
        messageString += ("\nType **>hit** if you want another card or type **>stand** to stand.");
        message.channel.send(messageString);
    }

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

function argIsValid(client, message, args){
    var userpoints = client.players[message.author.id].userdata.points;

    if(!args[0]){
        message.channel.send("**" + message.author.username + "**, please enter a valid number");
        return false;
    }
    if (isNumeric(args[0]) === false){
        message.channel.send("**" + message.author.username + "**, please enter a valid number.");
        return false;
    }

    var bet_amount = parseInt(args[0]);
    if(bet_amount <= 0){
        message.channel.send("**" + message.author.username + "**, please enter a positive number.");
        return false;
    }
    if(bet_amount > userpoints){
        message.channel.send("**" + message.author.username + "**, you don't have that much money. (**" + userpoints + "**:dollar:)");
        return false;
    }

    return true;
}

function isNumeric(num) {
    return !isNaN(num)
}

function randomNumber() {
    return Math.random();
}