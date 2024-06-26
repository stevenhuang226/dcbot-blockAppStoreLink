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
	if ( /apps.apple.com/.test(message.content) ) {
		await message.delete().then( message => {
			logger.write(LOGPATH, `delete:${message.content} from ${message.author.username}`)
		});
	}
});
client.on("error", (error) => {
	logger.write(LOGPATH, "error:" + error);
});
client.login(TOKEN);
