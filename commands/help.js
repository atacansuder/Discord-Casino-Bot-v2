let commandlist = require('./commandlist.json');

exports.run = (client, message, args) => {
    message.channel.send("Use >slot [number] to play the slot machine, >claim to claim points once an hour.");
    return;
    var list = "";
    for(var u in commandlist)
    {
        if(commandlist.hasOwnProperty(u))
        {
            list = list + commandlist[u].description + ", ";
        }
    }
    message.channel.send(list)
}