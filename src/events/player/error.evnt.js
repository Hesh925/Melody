const config = require("../../config/CONFIG.json");
const ezcolor = require("djs-easy-color");
const utils = require("djs-utils");

module.exports = {
	name: "error",
	execute(Discord, client, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, error) {
		console.log(error);
		console.log(error.resource.playbackDuration / 1000);
		console.log("caught this error".green);

		
		const error403 = new Discord.MessageEmbed()
			.setTitle("Error")
			.setColor(ezcolor.getColor("HEX", "red"))
			.setDescription(`Sorry, there was a problem with \`${ error.resource.metadata.title }\`. Attempting to play again`);
			
		client.commands.get("play").run(client, null, null, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying, null, null, error);

		client.guilds.cache.find(guild => guild.id === config.errorReporting.guildId).channels.cache.find(channel => channel.id === config.errorReporting.textCId).send(`\`${ error }\`, while playing: \`${ error.resource.metadata.title }\`, in guild \`${ error.resource.metadata.guildId }\``);
		client.guilds.cache.find(guild => guild.id === error.resource.metadata.guildId).channels.cache.find(channel => channel.id === error.resource.metadata.textCId).send({ embeds: [ error403 ] });
	}
};