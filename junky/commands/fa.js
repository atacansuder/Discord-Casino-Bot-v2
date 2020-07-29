const malScraper = require('mal-scraper');
const search = malScraper.search;
const type = 'anime';
const Discord = require('discord.js')


exports.run = (client, message, args) => {

  var name = args.join(" ")

  malScraper.getInfoFromName(name)
  .then((data) => {
    // Set tags (genres) as a single string.
    var genres = data.genres.join(", ")

    // Get synopsis (make it shorter if it is too long)
    if(data.synopsis.length > 1024){
      var synopsis = data.synopsis.slice(0, 1024);
    }
    else{
      var synopsis = data.synopsis;
    }

    // Get name
    var name = data.title;
    if(data.englishTitle !== '' && name !== data.englishTitle){
      name += " / " + data.englishTitle;
    }

    const embed = new Discord.RichEmbed()
      .setColor('#639fff')
      .setTitle(name)
      .setURL(data.url)
      .addField('Genres', genres, true)
      .addField('Score', data.score + " (" + data.scoreStats + ")", true)
      .addField('Status', data.status, true)
      .addField('Aired', data.aired, true)
      .addField('Episodes', data.episodes, true)
      .addField('Type', data.type, true)
      .addField('Favorites', data.favorites, true)
      .addField('Rank', data.ranked, true)
      .addField('Popularity', data.popularity, true)
      .addField('Synopsis', synopsis)
      .setImage(data.picture)

    message.channel.send(embed).catch(err => console.log(err));
  })
  .catch((err) => console.log(err))

}