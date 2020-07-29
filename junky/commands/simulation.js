exports.run = (client, message, args) => {

  var tries = 0;
  while(true){
    rng = Math.floor(Math.random() * 14545 + 1);
    tries += 1;
    if (rng === 1){
      message.channel.send("Waifu found in " + tries + " tries.")
      return;
    }

  }


}