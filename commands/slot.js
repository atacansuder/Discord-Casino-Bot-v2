exports.run = (client, message, args) => {
    
    var userpoints = client.players[message.author.id].userdata.points;

    if(argIsValid(client, message, args) === false) return;
    var bet_amount = parseInt(args[0]);

    const symbols = [[":moneybag:", 250], [":flag_jp:", 100], [":spades:", 75], [":diamonds:", 50], [":clubs:", 25], [":hearts:", 10], [":yen:", 1000]];
    



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