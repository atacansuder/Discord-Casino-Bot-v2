const fs = require('fs');

exports.run = (client, message, args) => {

    fs.readdir('./_02/', (err, picList) => {
        if (err) return console.error(err);
        var rng = Math.floor(Math.random() * picList.length);
        message.channel.send({files: ['./_02/' + picList[rng]]});
    });

    //message.channel.send({files: ['C:\\Users\\Atacan\\Desktop\\SayukiExtraStage2.jpg']});
}

const x = 'https://cdn.discordapp.com/attachments/715217035986206850/715221499283374090/66923283_p0_master1200.jpg';