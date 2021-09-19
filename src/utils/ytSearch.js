/* eslint-disable no-undefined */
const ytsr = require("ytsr");
const fs = require("fs");
const ytdl = require("ytdl-core");

const fileName = "output.log";
const dir = "./";
// Can take URL, video ID, or search term
// Returns video data or metadata
module.exports = async (message) => {
	const searchTerm = (String(message).replace(/,/g, " "));
	if(message !== null || message !== undefined) {
		if (ytdl.validateURL(searchTerm) || ytdl.validateID(searchTerm)){
			const videoData = await ytsr(searchTerm, {limit: 1, pages : 1});
			return videoData["items"][0];
		} else return null;
	} else return null;
};


async function main(bool) {
	function writeOutput(data, bool) {
		if (bool ) {
			fs.writeFile((dir.concat(fileName)), JSON.stringify(data["items"][0]), { flag: "a+" }, err => {
				if (err) {
					console.log(err);
				}
			});
		}
	}
	
	if(bool) {
		const message = "scooby doo theme song";
		if(message !== null || message !== undefined) {
			const videoData = await ytsr(message, {limit: 1, pages : 1});
			writeOutput(videoData, true);
			return videoData;
		} else return null;
	}
}
main(false);