const fs = require("fs");

exports.run = (client, message, args) => {
    
    if(!message.mentions.users.first()) return;
    const mentioned_user = message.mentions.users.first().id;
    if(!client.players[message.mentions.users.first().id]) return;

    var userpoints = client.players[message.author.id].userdata.points;
    if(argIsValid(client, message, args) === false) return;
    const amount = parseInt(args[1]);

    client.players[message.author.id].userdata.points -= amount;
    client.players[mentioned_user].userdata.points += amount;

    message.channel.send("**" + message.mentions.users.first().username + "**, **" + message.author.username + "** tarafınızdan hesabınıza " + args[1] + ":dollar: aktarıldı.");
    fs.writeFile(client.config.players_loc, JSON.stringify(client.players, null, 4), function (err) {
        if (err) {
          console.log(err);
        }
    });
    return;

}

function argIsValid(client, message, args){
    var userpoints = client.players[message.author.id].userdata.points;

    if(!args[1]){
        message.channel.send("**" + message.author.username + "**, lütfen geçerli bir sayı girin.");
        return false;
    }
    if (isNumeric(args[1]) === false){
        message.channel.send("**" + message.author.username + "**, lütfen geçerli bir sayı girin.");
        return false;
    }

    var bet_amount = parseInt(args[1]);
    if(bet_amount <= 0){
        message.channel.send("**" + message.author.username + "**, lütfen pozitif bir sayı girin.");
        return false;
    }
    if(bet_amount > userpoints){
        message.channel.send("**" + message.author.username + "**, bakiyenizde o kadar para bulunmamakta. (**" + userpoints + "**:dollar:)");
        return false;
    }

    return true;
}

function isNumeric(num) {
    return !isNaN(num)
}