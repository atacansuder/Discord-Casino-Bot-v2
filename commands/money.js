exports.run = (client, message, args) => {
    message.channel.send("**" + message.author.username + "**, you have " + client.players[message.author.id].userdata.points + " points.")
}