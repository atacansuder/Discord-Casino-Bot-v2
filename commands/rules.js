const Discord = require('discord.js');

exports.run = (client, message, args) => {

    const gameList = ["slot", "blackjack"];
    if(args.length === 0 || !gameList.includes(args[0])){
        message.channel.send("**" + message.author.username + "**, please enter the name of a game. Use >help for the list of games available.");
        return;
    }

    const input = args[0];
    switch(input){
        case "slot":
            slot(message);
            break;
        case "blackjack":
            blackjack(message);
            break;
    }

}

function slot(message){
    const rewards = ":flag_jp: x 3 = x1000\n"
    +":crown: x 3 = x250\n"
    +":shinto_shrine: x 3 = x125\n"
    +":race_car: x 3 = x100\n"
    +":tokyo_tower: x 3 = x75\n"
    +":man_mage: x 3 = x50\n"
    +":woman_elf: x 3 = x25\n"
    +":yen: x 1 = x2\n"
    +":yen: x 2 = x5\n"
    +":yen: x 3 = x500"
    message.channel.send("__**>slot [number]**__: Play the slot machine with the given number as the bet. The rewards are as follows:\n\n" + rewards);
}

function blackjack(message){
    const msg = "In blackjack, the goal for the player is to get as close as possible to 21 without exceeding it.\n"
    + "The dealer gives the player two cards and draws two cards themselves, but one of them is concealed. Then the player can **>hit** to draw more cards or **>stand** to keep their current hand.\n"
    + "The card values are as follows: the number cards have the same value, J, Q and K are worth 10. A worths 11 if the handsize does not exceed 21, otherwise it worths 1.\n"
    + "After the player stands, the dealer reveals the other card and keeps drawing cards until the hand size exceeds 17.\n"
    + "**If the player hits 21 at the beginning (getting a blackjack), they earn x3 of their bet.**\n"
    + "**If the player's handsize is greater than the dealer's, they earn x2.**\n"
    + "**If the handsizes are equal, the player gets their money back.**\n"
    + "Otherwise they lose."
    message.channel.send(msg);
}