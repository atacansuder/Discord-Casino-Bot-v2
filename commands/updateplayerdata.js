const fs = require("fs");

exports.run = (client, message, args) => {
    
    if(message.author.id != client.config.ownerID) return;
    for(var u in client.players)
    {
        if(client.players.hasOwnProperty(u))
        {
            client.players[u].userdata.seenUpdate = 0;
            client.players[u].blackjack.canBetInsurance = 0;
            client.players[u].blackjack.canDoubledown = 0;
        }
    }

    fs.writeFile(client.config.players_loc, JSON.stringify(client.players, null, 4), function (err) {
        if (err) {
          console.log(err);
        }
    });

}

