const fs = require("fs");

module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;
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

  cmd.run(client, message, args);
};

function create_user(c, user) {
  c.players[user.id] = {
    userdata: {
      points: 100,
      total_spent: 0,
      total_earned: 0,
      profit: 0
    },
    slot: {
      times_played_in_interval: 0,
      last_played: 0
    }
  }

  fs.writeFile(c.config.players_loc, JSON.stringify(c.players, null, 4), function (err) {
    if (err) {
      console.log(err);
    }
  });
}