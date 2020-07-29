const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const Enmap = require("enmap");

const config = require('./config.json');
client.config = config;


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });
  
client.commands = new Enmap();
  
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    console.log(`${commandName} loaded successfully.`);
  });
});

client.on('ready', () => {
  client.user.setStatus('available')
  console.log('Bot started successfully.');
})

client.on('message', message => {

  if(message.content === "shit bot"){
    message.delete();
    hentai.getBook(234638).then(book => {
      var cover = hentai.getImageURL(book.cover);    // https://t.nhentai.net/galleries/987560/cover.jpg
      var page1 = hentai.getImageURL(book.pages[1]); // https://i.nhentai.net/galleries/987560/2.jpg
      client.channels.get('713822331491057774').send({files: [cover, page1]});
    });
  }

})

client.login(config.token);