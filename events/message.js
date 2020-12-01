const fs = require("fs");
let players = require('./players.json');

module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  client.players = players;
  if(!client.players[message.author.id]){
    create_user(client, message.author);
  }


  var lowerMessage = message.content.toLowerCase();

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  
  if(players[message.author.id].userdata.seenUpdate === 0){
    message.channel.send(":warning: The bot has been updated. Changelog:\n- Slot machine got updated, one symbol was removed and the probability for other symbols have been increased. Type **>rules slot** to see the new symbols.");
    players[message.author.id].userdata.seenUpdate = 1;
    fs.writeFile(client.config.players_loc, JSON.stringify(client.players, null, 4), function (err) {
      if (err) {
        console.log(err);
      }
    });
  }

  //message.channel.send("Update notice: >help command has been added, from now on you can check it after updates to learn about how the bot works and how to play the games.");

  cmd.run(client, message, args);
};

function create_user(c, user) {
  c.players[user.id] = {
    userdata: {
      points: 100,
      total_spent: 0,
      total_earned: 0,
      profit: 0,
      seenUpdate: 0
    },
    claim: {
      lastClaim: 0
    },
    slot: {
      times_played_in_interval: 0,
      last_played: 0
    },
    blackjack: {
      isPlaying: 0,
      bet: 0,
      hand: [],
      dealerHand: []
    }
  }

  fs.writeFile(c.config.players_loc, JSON.stringify(c.players, null, 4), function (err) {
    if (err) {
      console.log(err);
    }
  });
}