module.exports = {
	name: "resetrp",
	description: "Resets rich presence",
	usage: "",
	args: {},
	category: "owner",
	aliases: [ "rp" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: true, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	// eslint-disable-next-line no-unused-vars
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice) {
		const types = [ "PLAYING", "STREAMING", "LISTENING", "WATCHING", "COMPETING" ];
		const statusTypes = [ "online", "idle", "dnd", "invisible" ];
		const env = utils.searchArgv("env", true) === "dev" ? "dev" : "prod";
		client.user.setPresence({ activities: [ { name: config.envSettings[env].status.status, type: types[config.envSettings[env].status.type] } ], status: statusTypes[config.envSettings[env].status.statusType] });
		
		console.log(config.envSettings[env].status.status);
	}
};