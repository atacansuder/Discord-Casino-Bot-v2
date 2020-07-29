const { API, } = require('E:\\Junky bot\\node_modules\\nhentai-api');
const TAG = require('E:\\Junky bot\\node_modules\\nhentai-api').Tag;
const hentai = new API();
const Discord = require('discord.js')


exports.run = (client, message, args) => {

  if (message.channel.id !== '601106336201310249' && message.channel.id !== '338396296731688962' && message.channel.type !== 'dm') return;
  if(message.channel.type !== 'dm') message.delete();

  if(message.channel.type === 'dm') console.log(message.author.username + " used >rh.")

  var tagToSearch = "";
  for(i = 0; i < args.length; i++){
    tagToSearch += args[i];
    if(i !== args.length - 1) tagToSearch += " ";
  }

  rng = Math.floor(Math.random() * 300000) + 1

  hentai.getBook(rng).then(book => {

    if (book.title.english) bookTitle = book.title.english;
    else bookTitle = book.title.japanese;

    tagString = "";
    for (i = 0; i < book.tags.length; i++) {
      tagString += book.tags[i].name;
      if (i !== book.tags.length - 1) tagString += ", ";
    }

    const embed = new Discord.RichEmbed()
      .setColor("#c900a1")
      .setTitle(bookTitle)
      .setURL('https://nhentai.net/g/' + rng)
      .addField('Tags', tagString)
      .addField('Favorites', book.favorites.toString())
      .setImage(hentai.getImageURL(book.cover))

    message.channel.send(embed).catch(err => console.log(err));

    }).catch(err => console.log(err))
}