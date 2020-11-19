const fs = require("fs");
const { config } = require("process");

exports.run = (client, message, args) => {
    
    msg_date = message.createdAt.getTime();
    lastClaim = client.players[message.author.id].claim.lastClaim;
    const timeSinceLastClaim = (msg_date - lastClaim) / 30000;

    //message.channel.send("Message date: " + msg_date + ", last claim: " + lastClaim + ", time since last claim: " + timeSinceLastClaim + "mins (rounded as " + Math.round(timeSinceLastClaim) + ")");

    if(timeSinceLastClaim < parseInt(client.config.claim_interval)){
        message.channel.send("**" + message.author.username + "**, you can only claim once every " + client.config.claim_interval + " minutes. Time remaining: " + (Math.ceil(parseInt(client.config.claim_interval) - timeSinceLastClaim)).toString() + " min.");
        return;
    }

    const claimAmount = Math.floor(Math.random()*(600-200+1)+200);
    client.players[message.author.id].userdata.points += claimAmount;
    message.channel.send("**" + message.author.username + "**, " + claimAmount + " points have been added to your account. (" + client.players[message.author.id].userdata.points + "$)");
    lastClaim = client.players[message.author.id].claim.lastClaim = msg_date;
    fs.writeFile(client.config.players_loc, JSON.stringify(client.players, null, 4), function (err) {
        if (err) {
          console.log(err);
        }
    });

}