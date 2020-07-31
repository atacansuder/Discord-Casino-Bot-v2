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
    
    if(client.players[message.author.id].slot.times_played_in_interval >= 15)
    {
        message.channel.send("**" + message.author.username + "**, saatlik slot oynama limiti 15'tir. Kalan süre: **" + String(parseInt(client.config.slot_interval) - Math.round((msg_date - last_played) / 60000)) + " dk.**");
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
            chance: 3
        },
        ":crown:": {
            pay: 250,
            chance: 6
        },
        ":shinto_shrine:": {
            pay: 125,
            chance: 8
        },
        ":race_car:": {
            pay: 100,
            chance: 10
        },
        ":hearts:": {
            pay: 75,
            chance: 12
        },
        ":man_mage:": {
            pay: 50,
            chance: 16
        },
        ":woman_elf:": {
            pay: 25,
            chance: 20
        },
        ":diamonds:": {
            pay: 10,
            chance: 20
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
            message.channel.send("Tebrikler **" + message.author.username + "**, " + bet_amount * 500 + "$ kazandınız.");
            client.players[message.author.id].userdata.points += bet_amount * 500;
        }
        else if(yen_counter === 2)
        {
            message.channel.send("Tebrikler **" + message.author.username + "**, " + bet_amount * 5 + "$ kazandınız.");
            client.players[message.author.id].userdata.points += bet_amount * 5;
        }
        else if(yen_counter === 1)
        {
            message.channel.send("Tebrikler **" + message.author.username + "**, " + bet_amount * 2 + "$ kazandınız.");
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
        message.channel.send("Tebrikler **" + message.author.username + "**, " + bet_amount * symbol_base[results[0]].pay + "$ kazandınız.");
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
        message.channel.send("**" + message.author.username + "**, lütfen geçerli bir sayı girin.");
        return false;
    }
    if (isNumeric(args[0]) === false){
        message.channel.send("**" + message.author.username + "**, lütfen geçerli bir sayı girin.");
        return false;
    }

    var bet_amount = parseInt(args[0]);
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