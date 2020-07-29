exports.run = (client, message, args) => {
    var list = "";
    for(var u in client.players)
    {
        if(client.players.hasOwnProperty(u))
        {
            list = list + client.players[u].userdata.username + ", ";
        }
    }
    message.channel.send(list)
}