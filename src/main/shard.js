const Discord = require("discord.js");
const utils = require("djs-utils");
const exitCodes = require("../config/exitCodes.json");

const ShardingManager = new Discord.ShardingManager("./src/main/main.js", {
	token: process.env.DISCORD_TOKEN_MELODY,
	totalShards: "auto"
});

ShardingManager.spawn().catch(error => {
	utils.log("[ERROR/SHARD] Shard failed to spawn.");
	console.log(error);
});

ShardingManager.on("shardCreate", shard => {
	shard.on("ready", () => {
		utils.log(`[DEBUG/SHARD] Shard ${ shard.id } connected to Discord's Gateway.`);
	});
	shard.on("disconnect", (disconnectEvent, id) => {
		utils.log(`Shard ${ id } disconnected`);
		console.log(disconnectEvent);
	});
	shard.on("reconnection", (id) => {
		utils.log(`Shard ${ id } reconnecting`);
	});

	// SHARD DEATH
	shard.on("death", (deathEvent) => {
		if(exitCodes[deathEvent["exitCode"]]){
			console.log(`Shard exited with code ${ deathEvent["exitCode"] }: "${ exitCodes[deathEvent["exitCode"]]["description"] }"`);
			if(exitCodes[deathEvent["exitCode"]]["killBot"]) { // Kills bot if config true
				console.log("Killing Bot");
				process.exit(0);
			}
		} else { process.exit(0); }
	});
});
