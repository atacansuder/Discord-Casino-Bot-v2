let commandlist = require('./commandlist.json');
const Discord = require('discord.js');

exports.run = (client, message, args) => {

    message.channel.send("**" + message.author.username + "**, the command is still being coded.");
}