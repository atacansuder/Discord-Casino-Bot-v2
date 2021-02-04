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
    +":sushi: x 3 = x250\n"
    +":shinto_shrine: x 3 = x125\n"
    +":race_car: x 3 = x100\n"
    +":tokyo_tower: x 3 = x75\n"
    +":man_mage: x 3 = x50\n"
    +":woman_elf: x 3 = x30\n"
    +":yen: x 1 = x2\n"
    +":yen: x 2 = x5\n"
    +":yen: x 3 = x500"
    message.channel.send("__**>slot [number]**__: Play the slot machine with the given number as the bet. The rewards are as follows:\n\n" + rewards);
}

function blackjack(message){
    const msg = "In blackjack, the goal for the player is to get as close as possible to 21 without exceeding it. Exceeding 21 will make the player immediately lose the game.\n"
    + "The dealer gives the player two cards and draws two cards themselves, but one of them is concealed. Then the player can use the following commands:\n\n"
    + "__**Commands:**__\n"
    + "**>hit**: the player will draw another card. The player can draw as many cards as they want unless their hand size exceeds 21.\n"
    + "**>stand**: the player chooses to keep current hand. Then it will be the dealer's turn.\n"
    + "**>doubledown**: as their first move, the player can choose to double their inital bet and draw only 1 card. If the player wins, they will get x4 of their initial bet.\n\n"
    + "After the player ends their turn, the dealer will reveal their concealed card and start drawing cards until their hand size exceeds 17. In the end, if the player's hand size is greater than the dealer's, they will earn x2 of their bet.\n"
    + "In rare cases, if the player gets 21 right at the beginning, they will immediately earn x3 of their bet.\n"
    + "If the hand sizes are the same, they will get their money back. Otherwise they lose.\n\n"
    + "__**Special rules**__:\n"
    + "If the dealer's revealed card is an Ace, the player can choose to place an insurance bet (half of their inital bet). If the dealer has a blackjack, they will get x2 of their insurance bet and the game will end. Otherwise they will lose that bet and the game continues as usual. The player can also choose not to place an insurance bet if they wish to do so."
    message.channel.send(msg);
}