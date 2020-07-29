exports.run = (client, message, args) => {

    message.delete();
    message.channel.send({files: ['https://i.kym-cdn.com/entries/icons/facebook/000/032/725/cover1.jpg']});
    return;

}