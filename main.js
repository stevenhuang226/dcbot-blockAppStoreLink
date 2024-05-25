import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
let logBuff = "";
logBuff += new Date(8.64e15).toString();
logBuff += "start work...";
client.on("ready", function() {
	console.log("logged int as %s", client.user.tag);
});
client.on("interactionCreate", async function (interaction) {
	if ( ! interaction.isChatInputCommand() ) {
		return;
	}
	if ( interaction.commandName === "ping" ) {
		await interaction.reply("Pong");
	}
});
client.on("messageCreate", async function (message) {
	if ( /apps.apple.com/.test(message.content) ) {
		console.log("block!");
	}
})
var TOKEN = "" //your token here
client.login(TOKEN):
