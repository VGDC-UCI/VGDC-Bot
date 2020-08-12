/*
 * =========================================================
 * =========================================================
 * THIS IS A PROFESSIONAL BOT.
 * HIS NAME IS LIPPO, I GUESS???
 * 						 
 * AND NOW HE'S WRITTEN IN
 * TYPESCRIPT! SHINY!
 * 
 * Written by Duncan Sparks for the UCI VGDC server
 * =========================================================
 * =========================================================
 */


import { Client, Message, MessageReaction, UserResolvable, TextChannel, DiscordAPIError, ReactionCollector, MessageEmbed } from "discord.js";
import * as fs from "fs";

const BotClient: Client = new Client();

const BotVersion: string = "1.8";
const BotVersionMsg: string = "Start implementing embed faq functionality";

const TokenFile: string = "token/token.txt";

const ServerVGDC: string = "228326116270538753";
const ChannelBotCommands: string = "653120059262369793";
const ChannelLabStatus: string = "629369478462963722";

const RoleOfficer: string = "364492667335213057";
const RoleAdmin: string = "230588792820596739";

const MessagePronouns: string = "656993023112118285";
const MessageDepartments: string = "691732673995079740";

const ReactionID1: string = "%F0%9F%87%AD";
const ReactionID2: string = "%F0%9F%87%B8";
const ReactionID3: string = "%F0%9F%87%B9";
const ReactionID4: string = "%F0%9F%87%A6";

const DepartmentID1: string = "%F0%9F%8E%A8"; //"🎨"; //"%F0%9F%96%8C"; // Art: artist palette
const DepartmentID2: string = "%F0%9F%8E%B5"; // "🎵"; //"%F0%9F%8E%B5"; // Audio: musical note
const DepartmentID3: string = "%F0%9F%8E%AE"; // "🎮"; //"%E2%9A%99"; // Design: video game
const DepartmentID4: string = "%E2%98%91%EF%B8%8F"; //"☑️"; //"%E2%98%91"; // Production: ballot box with check
const DepartmentID5: string = "%E2%9A%99%EF%B8%8F";  //"⚙️"; //"" // Programming: gear
const DepartmentID6: string = "%F0%9F%93%96"; //"📖"; // Writing: open book

const Role1: string = "591784945765187588";
const Role2: string = "591785143757176842";
const Role3: string = "591785165626408960";
const Role4: string = "591785189349261312";

const OfficerBirthdays: object = {
	"736303719284473958": new Date(0, 2 - 1, 12), // Duncan (Feb 12)
	"167126082338684938": new Date(0, 7 - 1, 4), // George (Jul 4)
	"364459051892998144": new Date(0, 4 - 1, 10), // Jen (Apr 10)

	"330809583763456011": new Date(0, 5 - 1, 20), // Mayan (May 20)
	"203323862006497281": new Date(0, 9 - 1, 23), // Riley (Sep 23)
	"192908991486099457": new Date(0, 6 - 1, 8), // Tina (Jun 8)
	"233340915886981121": new Date(0, 7 - 1, 24), // Wayne (Jul 24)
};

const QuestionRegex: RegExp = /(?:is.+the.+lab.+(?:open|closed))|(?:is.+the.+game.+lab.+(?:open|closed))|(?:(?:is.+)?anyone.+(?:in|at).+the.+lab)|(?:(?:is.+)?anyone.+(?:in|at).+the.+game.+lab)|(?:are.+there.+(?:any.+)?in.+the.+lab)|(?:are.+there.+(?:any)?.+(?:in|at).+the.+game.+lab)|(?:any.+(?:in|at).+the.+lab)|(?:any.+(?:in|at).+the.+game.+lab)|(?:(?:is)?.+(?:there.+)?(?:a|an)?(?:officer|person|anyone|someone).+(?:in|at).+the.+(?:game.+)?lab)/i;
//const BotNameRegex: RegExp = /(?:Lippo)/i;
const SecretLabRegex: RegExp = /(?:[s$]\s*(?:[e3&]\s*)+[ck]\s*[r4]\s*(?:[e3&i1]\s*)+[t7]\s*([e3&]\s*)*\s*[l1]\s*[a@8&]\s*[b8])/i;

var labOpen: boolean = false;
var reactionCollector: ReactionCollector;

const GameJamMode: boolean = false;
const ServerGameJam: string = "634283765555920897";
const ChannelGameJamRoles: string = "634794719033163826";
const RoleGameJamDesigner: string = "634463651989946381";
const RoleGameJamAudioDesigner: string = "634463797221916672";
const RoleGameJamArtist: string  = "634463662718844940";
const RoleGameJamProgrammer: string = "634463664765665321";
const RoleGameJamWriter: string = "634463666909216816";
const RoleGameJamProducer: string = "634463670461792297";

const RoleArt: string = "691715402677485669";
const RoleAudio: string = "691715513381945364";
const RoleDesign: string = "691715413998043186";
const RoleProduction: string = "691715438580596764";
const RoleProgramming: string = "691715359496994818";
const RoleWriting: string = "691715498668195911";

// =========================================================================

function mention(userId: string): string {
	return `<@${userId}>`;
}


function send_faq(channel: TextChannel, faqTopic: string, questions: Array<string>, answers: Array<string>): void {
	let embed: MessageEmbed = new MessageEmbed()
		.setColor("#8bb0f9")
		.setTitle(`FAQ - ${faqTopic}`)
		.setThumbnail("https://i.imgur.com/2AaGXDv.png");

	for (let i = 0; i < questions.length; i++) {
		embed.addField(questions[i], answers[i]);
	}

	channel.send(embed);
}


function send_faq_list(): void {

}


function processCommand(message: Message): void {
	let command: string = message.content.substr(1);
	let messageChannel: TextChannel = message.channel as TextChannel;
	if (command.startsWith("faq-")) {
		switch (command.substr(4)) {
			case "major": {

			} break;

			case "test": {
				//send_faq(messageChannel, "Test", "HELLO THERE!!! THIS IS A TEST OF THIS FANCY THING THAT DISCORD CALLS \"EMBEDS!\" WHOA!");
				send_faq(messageChannel, "Test",
					["Why should I join VGDC?", "Where can I find your club's Discord?", "Who are you?"],
					["Because making games is cool.", "You're in it. Yay.", "Yeah, that's my favorite song by The Who. Also, I'm Lippo."]
				);
			} break;

			default: {

			} break;
		}
	}
	else {
		switch (command) {
			case "labopen": {
				if ((message.member.roles.cache.has(RoleOfficer) || message.member.roles.cache.has(RoleAdmin)) && message.channel.id === ChannelLabStatus) {
					BotClient.user.setActivity("Game Lab OPEN");
					BotClient.user.setStatus("online");
					labOpen = true;
					console.log("Lab is now marked as OPEN.");
				}
			} break;
	
			case "labclosed": {
				if ((message.member.roles.cache.has(RoleOfficer) || message.member.roles.cache.has(RoleAdmin)) && message.channel.id === ChannelLabStatus) {
					BotClient.user.setActivity("Game Lab CLOSED");
					BotClient.user.setStatus("dnd");
					labOpen = false;
					console.log("Lab is now marked as CLOSED.");
				}
			} break;
	 
			case "version": {
				if ((message.member.roles.cache.has(RoleOfficer) || message.member.roles.cache.has(RoleAdmin)) && message.channel.id === ChannelLabStatus)
					message.channel.send(`Lippo's current version is ${BotVersion} (${BotVersionMsg})`);	
			} break;
		}
	}
}


function processCommandGameJam(message: Message): void {
	/*switch (message.content.substr(1)) {
		case "designer":
			message.member.roles.add(RoleGameJamDesigner);
			break;

		case "audio":
			message.member.roles.add(RoleGameJamAudioDesigner);
			break;
		
		case "artist":
			message.member.roles.add(RoleGameJamArtist);
			break;
		
		case "programmer":
			message.member.roles.add(RoleGameJamProgrammer);
			break;
		
		case "writer":
			message.member.roles.add(RoleGameJamWriter);
			break;
		
		case "producer":
			message.member.roles.add(RoleGameJamProducer);
			break;
	}*/
}

// =========================================================================

BotClient.on("ready", () => {
	console.log("Connected as " + BotClient.user.tag);

	BotClient.user.setActivity("Game Lab CLOSED");
	BotClient.user.setStatus("dnd");

	(BotClient.channels.cache.find(c => c.id === ChannelBotCommands) as TextChannel).messages.fetchPinned(true);
});


BotClient.on("message", (receivedMessage) => {
	if (receivedMessage.author === BotClient.user)
		return;

	// FAQ
	if (receivedMessage.guild.id === ServerVGDC && receivedMessage.content[0] === '!')
		processCommand(receivedMessage);

	// GAME JAM
	/*if (GameJamMode && receivedMessage.guild.id === ServerGameJam && receivedMessage.channel.id === ChannelGameJamRoles && receivedMessage.content[0] === '!')
		processCommandGameJam(receivedMessage);*/

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
	if (messageReaction.message.channel.id === ChannelBotCommands) {
		console.log("REACTION ADDED in channel");
		switch (messageReaction.emoji.identifier) {
			case ReactionID1:
				messageReaction.message.guild.member(user as UserResolvable).roles.add(Role1);
				break;
			case ReactionID2:
				messageReaction.message.guild.member(user as UserResolvable).roles.add(Role2);
				break;
			case ReactionID3:
				messageReaction.message.guild.member(user as UserResolvable).roles.add(Role3);
				break;
			case ReactionID4:
				messageReaction.message.guild.member(user as UserResolvable).roles.add(Role4);
				break;
			case DepartmentID1:
				messageReaction.message.guild.member(user as UserResolvable).roles.add(RoleArt);
				break;
			case DepartmentID2:
				messageReaction.message.guild.member(user as UserResolvable).roles.add(RoleAudio);
				break;
			case DepartmentID3:
				messageReaction.message.guild.member(user as UserResolvable).roles.add(RoleDesign);
				break;
			case DepartmentID4:
				messageReaction.message.guild.member(user as UserResolvable).roles.add(RoleProduction);
				break;
			case DepartmentID5:
				messageReaction.message.guild.member(user as UserResolvable).roles.add(RoleProgramming);
				break;
			case DepartmentID6:
				messageReaction.message.guild.member(user as UserResolvable).roles.add(RoleWriting);
				break;
		}
	}
});


BotClient.on("messageReactionRemove", (messageReaction, user) => {
	if (messageReaction.message.channel.id === ChannelBotCommands) {
		console.log("REACTION REMOVED in channel");
		switch (messageReaction.emoji.identifier) {
			case ReactionID1:
				messageReaction.message.guild.member(user as UserResolvable).roles.remove(Role1);
				break;
			case ReactionID2:
				messageReaction.message.guild.member(user as UserResolvable).roles.remove(Role2);
				break;
			case ReactionID3:
				messageReaction.message.guild.member(user as UserResolvable).roles.remove(Role3);
				break;
			case ReactionID4:
				messageReaction.message.guild.member(user as UserResolvable).roles.remove(Role4);
				break;
			case DepartmentID1:
				messageReaction.message.guild.member(user as UserResolvable).roles.remove(RoleArt);
				break;
			case DepartmentID2:
				messageReaction.message.guild.member(user as UserResolvable).roles.remove(RoleAudio);
				break;
			case DepartmentID3:
				messageReaction.message.guild.member(user as UserResolvable).roles.remove(RoleDesign);
				break;
			case DepartmentID4:
				messageReaction.message.guild.member(user as UserResolvable).roles.remove(RoleProduction);
				break;
			case DepartmentID5:
				messageReaction.message.guild.member(user as UserResolvable).roles.remove(RoleProgramming);
				break;
			case DepartmentID6:
				messageReaction.message.guild.member(user as UserResolvable).roles.remove(RoleWriting);
				break;
		}
	}
});

// =========================================================================

var token: string = fs.readFileSync(TokenFile).toString().trim();
BotClient.login(token);
