module.exports = (client, message, activity) => {
	const types = [ "PLAYING", "STREAMING", "LISTENING", "WATCHING", "COMPETING" ];
	client.user.setActivity((message ? message : "the waiting game"), { type: ( activity ? types[activity] : "PLAYING" ) } );
};