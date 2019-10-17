/*
 * =========================================================
 * =========================================================
 * 				 THIS IS A PROFESSIONAL BOT.
 *					THEIR NAME IS LIPPO,
 * 						 I GUESS???
 * 				 AND NOW THEY'RE WRITTEN IN
 * 					 TYPESCRIPT! SHINY!
 * 
 * 	   Written by Duncan Sparks for the UCI VGDC server
 * =========================================================
 * =========================================================
 */


import { Client, Message } from "discord.js";

const BotClient: Client = new Client();

const ChannelBotCommands: string = "591789863116996610";
const ChannelLabStatus: string = "629369478462963722";
const Role1: string = "591784945765187588";
const Role2: string = "591785143757176842";
const Role3: string = "591785165626408960";
const Role4: string = "591785189349261312";

const QuestionRegex: RegExp = /(?:is.+the.+lab.+(?:open|closed))|(?:is.+the.+game.+lab.+(?:open|closed))|(?:(?:is.+)?anyone.+(?:in|at).+the.+lab)|(?:(?:is.+)?anyone.+(?:in|at).+the.+game.+lab)|(?:are.+there.+(?:any.+)?in.+the.+lab)|(?:are.+there.+(?:any)?.+(?:in|at).+the.+game.+lab)|(?:any.+(?:in|at).+the.+lab)|(?:any.+(?:in|at).+the.+game.+lab)|(?:(?:is)?.+(?:there.+)?(?:a|an)?(?:officer|person|anyone|someone).+(?:in|at).+the.+(?:game.+)?lab)/i;
//const BotNameRegex: RegExp = /(?:Lippo)/i;
const SecretLabRegex: RegExp = /(?:secret\s+lab)/i;

var labOpen: boolean = false;

var test: Object = {};

// =========================================================================

function mention(userId: string): string {
	return `<@${userId}>`;
}


function printHelp(message: Message): void {
	message.channel.send(`${mention(message.author.id)} Type \`!he\`, \`!she\`, \`!they\`, or \`!askme\` to let us know what your preferred pronouns are.\nType \`!lab\` or look at my name for the current status of the Game Lab.`);
}


function processCommand(message: Message): void {
	switch (message.content.substr(1)) {
		case "he": {
			message.member.addRole(Role1);
			console.log(`Added pronouns role to ${message.member.user.tag}`);
			break;
		}
			
		case "she": {
			message.member.addRole(Role2);
			console.log(`Added pronouns role to ${message.member.user.tag}`);
			break;
		}
			
		case "they": {
			message.member.addRole(Role3);
			console.log(`Added pronouns role to ${message.member.user.tag}`);
			break;
		}
			
		case "askme": {
			message.member.addRole(Role4);
			console.log(`Added pronouns role to ${message.member.user.tag}`);
			break;
		}

		case "lab":
			message.channel.send(`The Game Lab is currently ${labOpen ? "OPEN" : "CLOSED"}.`);
			break;
	
		case "help":
			printHelp(message);
			break;

		case "labopen": {
			if ((message.member.roles.find(r => r.name === "VGDC Officer") || message.member.roles.find(r => r.name === "VGDC Admin")) && message.channel.id === ChannelLabStatus) {
				BotClient.user.setActivity("Game Lab OPEN");
				BotClient.user.setStatus("online");
				labOpen = true;
				console.log("Lab is now marked as OPEN.");
			}

			break;
		}

		case "labclosed": {
			if ((message.member.roles.find(r => r.name === "VGDC Officer") || message.member.roles.find(r => r.name === "VGDC Admin")) && message.channel.id === ChannelLabStatus) {
				BotClient.user.setActivity("Game Lab CLOSED");
				BotClient.user.setStatus("dnd");
				labOpen = false;
				console.log("Lab is now marked as CLOSED.");
			}

			break;
		}
	}
}

// =========================================================================

BotClient.on("ready", () => {
	console.log("Connected as " + BotClient.user.tag);

	BotClient.user.setActivity("Game Lab CLOSED");
	BotClient.user.setStatus("dnd");
});


BotClient.on("message", (receivedMessage) => {
	if (receivedMessage.author === BotClient.user)
		return;

	// Commands
	if ((receivedMessage.channel.id === ChannelBotCommands || receivedMessage.channel.id === ChannelLabStatus) && receivedMessage.content[0] == '!')
		processCommand(receivedMessage);

	if (receivedMessage.content.search(SecretLabRegex) !== -1) {
		receivedMessage.channel.send(`${mention(receivedMessage.author.id)} I think you mean "Quiet Lab."`);
	}

	if (receivedMessage.content.search(QuestionRegex) !== -1) {
		receivedMessage.channel.send(`${mention(receivedMessage.author.id)} Hi there. I happened to hear you ask whether the lab is open. ${labOpen ? "Yes. It is." : "No. It's not."} Have a wonderful day.`);
		return;
	}
});

// =========================================================================

BotClient.login("NTYzNTg4NjI4MTE1MzU3Njk2.XKbg_g.ELHxFhrx2BFjCLAX2pnaNtUJF8M");
