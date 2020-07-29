const { API, } = require('E:\\Junky bot\\node_modules\\nhentai-api');
const hentai = new API();
const Discord = require('discord.js')


exports.run = (client, message, args) => {

  if (message.channel.id !== '601106336201310249' && message.channel.id !== '338396296731688962' && message.channel.id !== '713822331491057774') return;
  message.delete();

  book_id = args[0];
  hentai.getBook(book_id).then(book => {
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
      .setURL('https://nhentai.net/g/' + book_id)
      .addField('Tags', tagString)
      .addField('Favorites', book.favorites.toString())
      .setImage(hentai.getImageURL(book.cover))

    message.channel.send(embed).catch(err => console.log(err));
    return;
  }).catch(err => console.log(err))

}