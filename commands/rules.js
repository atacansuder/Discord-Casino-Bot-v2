const Discord = require('discord.js');

exports.run = (client, message, args) => {

    const gameList = ["slot"];
    if(args.length === 0 || !gameList.includes(args[0])){
        message.channel.send("**" + message.author.username + "**, please enter the name of a game. Use >help for the list of games available.");
        return;
    }

    const input = args[0];
    switch(input){
        case "slot":
            slot(message);
            break;
    }

}

function slot(message){
    const rewards = ":flag_jp: x 3 = x1000\n"
    +":crown: x 3 = x250\n"
    +":shinto_shrine: x 3 = x125\n"
    +":race_car: x 3 = x100\n"
    +":hearts: x 3 = x75\n"
    +":man_mage: x 3 = x50\n"
    +":woman_elf: x 3 = x25\n"
    +":diamonds: x 3 = x10\n"
    +":yen: x 1 = x2\n"
    +":yen: x 2 = x5\n"
    +":yen: x 3 = x500"
    message.channel.send("__**>slot [number]**__: Play the slot machine with the given number as the bet. The rewards are as follows:\n\n" + rewards);
}