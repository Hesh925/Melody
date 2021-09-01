const ytsr = require("ytsr");
const metadata = require("./createMetadata");
// Can take URL, video ID, or search term
// Returns video data or metadata
module.exports = async (message, bool) => {
	if(message !== null || message !== undefined) {
		const generateMetadata = bool || false;
		const videoData = await ytsr(message, {limit: 1, pages : 1});
		if(generateMetadata) return metadata(videoData.items[0]);
		else return videoData;
	} else return null;
};