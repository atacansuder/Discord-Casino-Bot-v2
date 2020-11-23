let commandlist = require('./commandlist.json');
const Discord = require('discord.js');

exports.run = (client, message, args) => {

    const generalCommands = orderCommands("general");
    const gameCommands = orderCommands("game");

    const helpEmbed = new Discord.MessageEmbed()
        .setColor("#03fc30")
        .setTitle("Junky Bot Commands")
        .setDescription("For questions, contact @schweppestr#3352 \n\n __**General Commands**__\n" + generalCommands + "\n__**Game Commands**__\n" + gameCommands);
        
    
    

    message.channel.send(helpEmbed);
}

function orderCommands(commandType){
    var result = "";
    for(var u in commandlist)
    {
        if(commandlist.hasOwnProperty(u) && commandlist[u].type === commandType)
        {
            result = result + "**>" + commandlist[u].name + "**: " + commandlist[u].description + "\n";
        }
    }
    return result;
}