/* eslint-disable */
// Shit that needs to run constantly or on an interval

const utils = require("djs-utils");
let CronJob = require('cron').CronJob;
module.exports = (client, Discord, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
	var updateData = new CronJob("05 * * * * *", function () {
		utils.pm2.setData(client);
	}, null, true, "America/Los_Angeles");
	updateData.start();
};