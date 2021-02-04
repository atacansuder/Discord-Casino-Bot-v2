const fs = require("fs");

exports.run = (client, message, args) => {
    
    msg_date = message.createdAt.getTime();
    last_played = client.players[message.author.id].slot.last_played;

    if(Math.round((msg_date - last_played) / 60000) >= parseInt(client.config.slot_interval) && client.players[message.author.id].slot.last_played !== 0)
    {
        client.players[message.author.id].slot.times_played_in_interval = 1;
        client.players[message.author.id].slot.last_played = 0;
        fs.writeFile(client.config.players_loc, JSON.stringify(client.players, null, 4), function (err) {
            if (err) {
              console.log(err);
            }
        });
    }
    
    if(client.players[message.author.id].slot.times_played_in_interval >= 20)
    {
        message.channel.send("**" + message.author.username + "**, you can only play 20 times in an interval. Time left: **" + String(parseInt(client.config.slot_interval) - Math.round((msg_date - last_played) / 60000)) + " min.**");
        return;
    }

    client.players[message.author.id].slot.times_played_in_interval += 1;
    if(client.players[message.author.id].slot.times_played_in_interval === 15){
        client.players[message.author.id].slot.last_played = msg_date;
    }

    var userpoints = client.players[message.author.id].userdata.points;

    if(argIsValid(client, message, args) === false) return;
    var bet_amount = parseInt(args[0]);

    client.players[message.author.id].userdata.points -= bet_amount;

    const symbol_base = {
        ":yen:": {
            chance: 5
        },
        ":flag_jp:": {
            pay: 1000,
            chance: 6
        },
        ":sushi:": {
            pay: 250,
            chance: 7
        },
        ":shinto_shrine:": {
            pay: 125,
            chance: 10
        },
        ":race_car:": {
            pay: 100,
            chance: 12
        },
        ":tokyo_tower:": {
            pay: 75,
            chance: 15
        },
        ":man_mage:": {
            pay: 50,
            chance: 20
        },
        ":woman_elf:": {
            pay: 30,
            chance: 25
        }
    }
    
    var symbols = [];
    for(var s in symbol_base)
    {
        if(symbol_base.hasOwnProperty(s))
        {
            for(var counter = 0; counter < symbol_base[s].chance; counter++)
            {
                symbols.push(s);
            }
        }
    }

    var results = [];
    var yen_counter = 0;
    for(var c = 0; c < 3; c++)
    {
        const rng = Math.floor(Math.random() * 100);
        const picked_symbol = symbols[rng];
        if(picked_symbol === ":yen:")
        {
            yen_counter += 1;
        }
        results.push(picked_symbol)
    }

    message.channel.send("**" + message.author.username + ":** " + results[0] + "|" + results[1] + "|" + results[2]);

    if(yen_counter > 0){
        if(yen_counter === 3)
        {
            message.channel.send("Congrats **" + message.author.username + "**, you have won " + bet_amount * 500 + "$.");
            client.players[message.author.id].userdata.points += bet_amount * 500;
        }
        else if(yen_counter === 2)
        {
            message.channel.send("Congrats **" + message.author.username + "**, you have won " + bet_amount * 5 + "$.");
            client.players[message.author.id].userdata.points += bet_amount * 5;
        }
        else if(yen_counter === 1)
        {
            message.channel.send("Congrats **" + message.author.username + "**, you have won " + bet_amount * 2 + "$.");
            client.players[message.author.id].userdata.points += bet_amount * 2;
        }

        fs.writeFile(client.config.players_loc, JSON.stringify(client.players, null, 4), function (err) {
            if (err) {
              console.log(err);
            }
        });
        return;
    }

    if(results[0] === results[1] && results[0] === results[2])
    {
        message.channel.send("Congrats **" + message.author.username + "**, you have won " + bet_amount * symbol_base[results[0]].pay + "$");
        client.players[message.author.id].userdata.points += bet_amount * symbol_base[results[0]].pay;
    }

    fs.writeFile(client.config.players_loc, JSON.stringify(client.players, null, 4), function (err) {
        if (err) {
          console.log(err);
        }
    });
    return;

}

function isNumeric(num) {
    return !isNaN(num)
}

function argIsValid(client, message, args){
    var userpoints = client.players[message.author.id].userdata.points;

    if(!args[0]){
        message.channel.send("**" + message.author.username + "**, please enter a valid number");
        return false;
    }
    if (isNumeric(args[0]) === false){
        message.channel.send("**" + message.author.username + "**, please enter a valid number.");
        return false;
    }

    var bet_amount = parseInt(args[0]);
    if(bet_amount <= 0){
        message.channel.send("**" + message.author.username + "**, please enter a positive number.");
        return false;
    }
    if(bet_amount > userpoints){
        message.channel.send("**" + message.author.username + "**, you don't have that much money. (**" + userpoints + "**:dollar:)");
        return false;
    }

    return true;
}