/*
 * =========================================================
 * =========================================================
 * THIS IS A PROFESSIONAL BOT.
 * THEIR NAME IS LIPPO, I GUESS???
 * 						 
 * AND NOW THEY'RE WRITTEN IN
 * TYPESCRIPT! SHINY!
 * 
 * Written by Duncan Sparks for the UCI VGDC server
 * =========================================================
 * =========================================================
 */


import { Client, Message, MessageReaction } from "discord.js";
import * as fs from "fs";
import { ScaffoldServer } from "./ScaffoldServer"; // Using this later, possibly

const BotClient: Client = new Client();

const BotVersion: string = "1.5";
const BotVersionMsg: string = "New reaction functionality";

const TokenFile: string = "token/token.txt";

const ServerVGDC: string = "228326116270538753";
const ChannelBotCommands: string = "591789863116996610";
const ChannelLabStatus: string = "629369478462963722";
const ChannelReactions: string = "653120059262369793";

const ReactionID1: string = "%F0%9F%87%AD";
const ReactionID2: string = "%F0%9F%87%B8";
const ReactionID3: string = "%F0%9F%87%B9";
const ReactionID4: string = "%F0%9F%87%A6";

const Role1: string = "591784945765187588";
const Role2: string = "591785143757176842";
const Role3: string = "591785165626408960";
const Role4: string = "591785189349261312";

const QuestionRegex: RegExp = /(?:is.+the.+lab.+(?:open|closed))|(?:is.+the.+game.+lab.+(?:open|closed))|(?:(?:is.+)?anyone.+(?:in|at).+the.+lab)|(?:(?:is.+)?anyone.+(?:in|at).+the.+game.+lab)|(?:are.+there.+(?:any.+)?in.+the.+lab)|(?:are.+there.+(?:any)?.+(?:in|at).+the.+game.+lab)|(?:any.+(?:in|at).+the.+lab)|(?:any.+(?:in|at).+the.+game.+lab)|(?:(?:is)?.+(?:there.+)?(?:a|an)?(?:officer|person|anyone|someone).+(?:in|at).+the.+(?:game.+)?lab)/i;
//const BotNameRegex: RegExp = /(?:Lippo)/i;
const SecretLabRegex: RegExp = /(?:[s$]\s*(?:[e3&]\s*)+[ck]\s*[r4]\s*(?:[e3&i1]\s*)+[t7]\s*([e3&]\s*)*\s*[l1]\s*[a@8&]\s*[b8])/i;

var labOpen: boolean = false;

const GameJamMode: boolean = false;
const ServerGameJam: string = "634283765555920897";
const ChannelGameJamRoles: string = "634794719033163826";
const RoleGameJamDesigner: string = "634463651989946381";
const RoleGameJamAudioDesigner: string = "634463797221916672";
const RoleGameJamArtist: string  = "634463662718844940";
const RoleGameJamProgrammer: string = "634463664765665321";
const RoleGameJamWriter: string = "634463666909216816";
const RoleGameJamProducer: string = "634463670461792297";

// =========================================================================

function mention(userId: string): string {
	return `<@${userId}>`;
}


function printHelp(message: Message): void {
	message.channel.send(`${mention(message.author.id)} Type \`!he\`, \`!she\`, \`!they\`, or \`!askme\` to let us know what your preferred pronouns are.\nType \`!lab\` or look at my name for the current status of the Game Lab.`);
}


function processCommand(message: Message): void {
	switch (message.content.substr(1)) {
		/*case "he": {
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
		}*/

		/*case "lab":
			message.channel.send(`The Game Lab is currently ${labOpen ? "OPEN" : "CLOSED"}.`);
			break;*/
	
		/*case "help":
			printHelp(message);
			break;*/

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

		case "version":
			if ((message.member.roles.find(r => r.name === "VGDC Officer") || message.member.roles.find(r => r.name === "VGDC Admin")))
				message.channel.send(`Lippo's current version is ${BotVersion} (${BotVersionMsg})`);

			break;
	}
}


function processCommandGameJam(message: Message): void {
	switch (message.content.substr(1)) {
		case "designer":
			message.member.addRole(RoleGameJamDesigner);
			break;

		case "audio":
			message.member.addRole(RoleGameJamAudioDesigner);
			break;
		
		case "artist":
			message.member.addRole(RoleGameJamArtist);
			break;
		
		case "programmer":
			message.member.addRole(RoleGameJamProgrammer);
			break;
		
		case "writer":
			message.member.addRole(RoleGameJamWriter);
			break;
		
		case "producer":
			message.member.addRole(RoleGameJamProducer);
			break;
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

	// GAME JAM
	if (GameJamMode && receivedMessage.guild.id === ServerGameJam && receivedMessage.channel.id === ChannelGameJamRoles && receivedMessage.content[0] === '!')
		processCommandGameJam(receivedMessage);

	// Commands
	if (receivedMessage.guild.id === ServerVGDC && (receivedMessage.channel.id === ChannelBotCommands || receivedMessage.channel.id === ChannelLabStatus) && receivedMessage.content[0] === '!')
		processCommand(receivedMessage);

	if (receivedMessage.guild.id === ServerVGDC && receivedMessage.content.search(SecretLabRegex) !== -1) {
		receivedMessage.channel.send(`${mention(receivedMessage.author.id)} I think you mean "Quiet Lab."`);
	}

	/* if (receivedMessage.guild.id === ServerVGDC && receivedMessage.content.search(QuestionRegex) !== -1) {
		receivedMessage.channel.send(`${mention(receivedMessage.author.id)} Hi there. I happened to hear you ask whether the lab is open. ${labOpen ? "Yes. It is." : "No. It's not."} Have a wonderful day.`);
		return;
	} */
});


BotClient.on("messageReactionAdd", (messageReaction, user) => {
	if (messageReaction.message.channel.id === ChannelReactions) {
		switch (messageReaction.emoji.identifier) {
			case ReactionID1:
				messageReaction.message.guild.fetchMember(user).then((member) => member.addRole(Role1));
				break;
			case ReactionID2:
				messageReaction.message.guild.fetchMember(user).then((member) => member.addRole(Role2));
				break;
			case ReactionID3:
				messageReaction.message.guild.fetchMember(user).then((member) => member.addRole(Role3));
				break;
			case ReactionID4:
				messageReaction.message.guild.fetchMember(user).then((member) => member.addRole(Role4));
				break;
		}
	}
});

// =========================================================================

var token: string = fs.readFileSync(TokenFile).toString();
BotClient.login(token);
