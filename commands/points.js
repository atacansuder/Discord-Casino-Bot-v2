exports.run = (client, message, args) => {
    message.channel.send("**" + message.author.username + "**, " + client.players[message.author.id].userdata.points + " puanınız bulunmakta.")
}