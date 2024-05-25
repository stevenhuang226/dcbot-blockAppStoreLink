const rl = require("readline");
const readline = rl.createInterface({
	input: process.stdin,
	output: process.stdout, 
});
const logger = require("./shdlib/logger.js");
const { Client, GatewayIntentBits } = require("discord.js");
const { TOKEN, LOGPATH } = require("./config.json")
console.log("token= %s", TOKEN);
console.log("log path= %s", LOGPATH);
const client = new Client({intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
]});
client.on("ready", () => {
	console.log(`logged in as ${client.user.tag}`)
	logger.write(LOGPATH, `log in as: ${client.user.tag}`)
});
client.on("messageCreate", async (message) => {
	console.log('get message: ', message.content);
	if ( /apps.apple.com/.test(message.content) ) {
		logger.write(LOGPATH, "block" + message.content);
	}
});
client.on("error", (error) => {
	logger.write(LOGPATH, "error:" + error);
});
client.login(TOKEN);
