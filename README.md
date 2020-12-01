# Discord-Casino-Bot-v2

This is the improved version of the previous gambling bot that I have programmed last year. It has been a long time since I shut down the previous one, but some friends requested me to start it again. However I was unhappy with the way I programmed that bot so I have started from the scratch. This time I am programming "properly", for example using different files for each command and event, which makes the bot much clearer to work with. Currently there is only a slot machine command and the users can give each other points, but more features will be added soon.

**Disclaimer:** only virtual points are used in this bot, I do not advocate gambling, especially with real money. This bot was made for fun amongst friends only. 

# How the bot works

The commands of the bot is stored in the "commands" folder. Each name.js represents a command. The .json files are only used for data storage. The players can enter a command name with the '>' prefix in a specific text channel and the bot will respond accordingly. 

# Commands

**claim**: The users can claim a random amount of money between 200 and 600 every 20 minutes. The claim interval can be chanaged in the config file.

**give @user [amount]**: gives the mentioned user the specified amount of money.

**help**: shows the list of commands and how to use them. The information for commands are taken from the commandlist.json file, available in the same directory.

**money**: shows how much money the user has.

**profile**: (currently still under construction) will show the user information about themselves such as money amount, total profits, total played games etc.

**rules [game]**: shows the rules of the specified game.

**slot [money]**: bets an amount of money on the slot machine. The bot selects 3 random symbols and gives rewards accordingly.

**blackjack [money]**: bets an amount of money on blackjack. The user gets 2 cards and the bot draws 2 cards for itself, one concealed. The player can afterwards use **hit** command to draw another card or **stand** to keep their hand. The bot then draws cards until its hand's total exceeds 17. The regular blackjack rules apply.
