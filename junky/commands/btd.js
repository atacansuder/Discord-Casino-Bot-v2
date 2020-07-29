exports.run = (client, message, args, h) => {
    
    if(!args || args.length < 1) return;
    var binary = args[0];

    if(binary < 0) return;
    for(i = binary.length; i > 0; i--)
    {
        if(binary[i-1] > 1) return;
    }

    message.reply(binary + " in decimal format: " + parseInt(binary, 2));
}