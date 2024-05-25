const { Client, GatewayIntentBits } = require("discord.js");
const rl = require("readline");
const readline = rl.createInterface({
	input: process.stdin,
	output: process.stdout, 
});
const logger = require("./shdlib/logger.js");
var TOKEN = "";
var LOGPATH = "";
async function setTOK() {
	await new Promise( async (resolve) => {
		readline.question("input token:", (ans) =>{
			TOKEN = ans;
			resolve();
		});
	}).then( () => {
		return 0;
	} )
}
async function setLogPath() {
	const fs = require("node:fs");
	await new Promise( async (resolve) => {
		readline.question("input log path:", async (ans) => {
			await fs.access(ans, fs.constants.W_Ok, async (error) => {
				if ( error ) {
					await setLogPath();
					resolve();
				}
				else {
					LOGPATH = ans;
					resolve();
				}
			});
		});
	});
}
async function main() {
	const { Client, GatewayIntentBits } = require("discord.js");
	await setTOK();
	await setLogPath();
	console.log("token= %s", TOKEN);
	console.log("log path= %s", LOGPATH);
	const client = new Client({intents: [
		GatewayIntentBits.Guilds,
	]});
	client.on("ready", () => {
		console.log(`logged in as ${client.user.tag}`)
	});
	client.on("messageCreate", async (message) => {
		if ( /apps.apple.com/.test(message.content) ) {
			logger.write(LOGPATH, "block" + message.content);
		}
	});
	client.on("error", (error) => {
		logger.write(LOGPATH, "error:" + error);
	});
	client.login(TOKEN);
}
main();
