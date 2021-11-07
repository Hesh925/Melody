const config = require("../../config/CONFIG.json");
const ezcolor = require("djs-easy-color");
module.exports = {
	name: "error",
	execute(Discord, client, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, error) {
		console.log(`${ error }`.red);
		console.log(error);
		console.log("caught this error".green);

		
		const error403 = new Discord.MessageEmbed()
			.setTitle("Error `403`")
			.setColor(ezcolor.getColor("HEX", "red"))
			.setDescription(`Sorry, there was a problem with \`${ error.resource.metadata.title }\`. Skipping`);
		
		client.guilds.cache.find(guild => guild.id === config.errorReporting.guildId).channels.cache.find(channel => channel.id === config.errorReporting.textCId).send(`\`${ error }\`, while playing: \`${ error.resource.metadata.title }\`, in guild \`${ error.resource.metadata.guildId }\``);
		client.guilds.cache.find(guild => guild.id === error.resource.metadata.guildId).channels.cache.find(channel => channel.id === error.resource.metadata.textCId).send("<@575844183546265609>", {embeds: error403});
	}
};