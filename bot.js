var Discord = require("discord.io");
var logger = require("winston");
var auth = require("./auth.json");

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
})
logger.level = 'debug';

var bot = new Discord.Client({
	token: auth.token,
	autorun: true
})
bot.on('ready', function(evt) {
	logger.info('Connected');
	logger.info('Logged in as: ')
	logger.info(bot.username + ' - (' + bot.id + ')');
})
bot.on('message', function (user, userID, channelID, message, event) {
	var caps = 0;

	var letters = message.split("");

	for (var i = 0; i < letters.length; i++) {
			if (letters[i].toUpperCase() == letters[i] && letters[i].toLowerCase() != letters[i].toUpperCase()) {
				caps ++;
			}
	}

	if (caps >= letters.length * 0.35) {
		bot.deleteMessage({
    		channelID: channelID,
    		messageID: event.d.id
		});
		bot.sendMessage({
			to: userID,
			message: "Hey! You're using too many caps!!"
		})
	}

	if (message == "Hi everybody!") {
		bot.sendMessage({
			to: channelID,
			messageID: "Hello!"
		})
	}

	if (message.substring(0, 1) == "!") {
		var args = message.substring(1).split(' ');
		var cmd = args[0];

		args = args.splice(1);
		switch (cmd) {
			case 'ping':
				bot.sendMessage({
					to: channelID,
					message: 'Pong!'
				});
				break;

			case 'hello':
				bot.sendMessage({
					to: channelID,
					message: "Bye!"
				})
				break;

			case 'say':
				var botMessage = message.substring(4);

				bot.sendMessage({
					to: channelID,
					message: botMessage
				})
		}
	}
})