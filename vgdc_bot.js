"use strict";
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
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var fs = require("fs");
var BotClient = new discord_js_1.Client();
var BotVersion = "1.73";
var BotVersionMsg = "Update to new API";
var TokenFile = "token/token.txt";
var ServerVGDC = "228326116270538753";
var ChannelBotCommands = "653120059262369793";
var ChannelLabStatus = "629369478462963722";
var RoleOfficer = "364492667335213057";
var RoleAdmin = "230588792820596739";
var MessagePronouns = "656993023112118285";
var MessageDepartments = "691732673995079740";
var ReactionID1 = "%F0%9F%87%AD";
var ReactionID2 = "%F0%9F%87%B8";
var ReactionID3 = "%F0%9F%87%B9";
var ReactionID4 = "%F0%9F%87%A6";
var DepartmentID1 = "%F0%9F%8E%A8"; //"🎨"; //"%F0%9F%96%8C"; // Art: artist palette
var DepartmentID2 = "%F0%9F%8E%B5"; // "🎵"; //"%F0%9F%8E%B5"; // Audio: musical note
var DepartmentID3 = "%F0%9F%8E%AE"; // "🎮"; //"%E2%9A%99"; // Design: video game
var DepartmentID4 = "%E2%98%91%EF%B8%8F"; //"☑️"; //"%E2%98%91"; // Production: ballot box with check
var DepartmentID5 = "%E2%9A%99%EF%B8%8F"; //"⚙️"; //"" // Programming: gear
var DepartmentID6 = "%F0%9F%93%96"; //"📖"; // Writing: open book
var Role1 = "591784945765187588";
var Role2 = "591785143757176842";
var Role3 = "591785165626408960";
var Role4 = "591785189349261312";
var QuestionRegex = /(?:is.+the.+lab.+(?:open|closed))|(?:is.+the.+game.+lab.+(?:open|closed))|(?:(?:is.+)?anyone.+(?:in|at).+the.+lab)|(?:(?:is.+)?anyone.+(?:in|at).+the.+game.+lab)|(?:are.+there.+(?:any.+)?in.+the.+lab)|(?:are.+there.+(?:any)?.+(?:in|at).+the.+game.+lab)|(?:any.+(?:in|at).+the.+lab)|(?:any.+(?:in|at).+the.+game.+lab)|(?:(?:is)?.+(?:there.+)?(?:a|an)?(?:officer|person|anyone|someone).+(?:in|at).+the.+(?:game.+)?lab)/i;
//const BotNameRegex: RegExp = /(?:Lippo)/i;
var SecretLabRegex = /(?:[s$]\s*(?:[e3&]\s*)+[ck]\s*[r4]\s*(?:[e3&i1]\s*)+[t7]\s*([e3&]\s*)*\s*[l1]\s*[a@8&]\s*[b8])/i;
var labOpen = false;
var reactionCollector;
var GameJamMode = false;
var ServerGameJam = "634283765555920897";
var ChannelGameJamRoles = "634794719033163826";
var RoleGameJamDesigner = "634463651989946381";
var RoleGameJamAudioDesigner = "634463797221916672";
var RoleGameJamArtist = "634463662718844940";
var RoleGameJamProgrammer = "634463664765665321";
var RoleGameJamWriter = "634463666909216816";
var RoleGameJamProducer = "634463670461792297";
var RoleArt = "691715402677485669";
var RoleAudio = "691715513381945364";
var RoleDesign = "691715413998043186";
var RoleProduction = "691715438580596764";
var RoleProgramming = "691715359496994818";
var RoleWriting = "691715498668195911";
// =========================================================================
function mention(userId) {
    return "<@" + userId + ">";
}
function processCommand(message) {
    switch (message.content.substr(1)) {
        case "labopen": {
            if ((message.member.roles.cache.has(RoleOfficer) || message.member.roles.cache.has(RoleAdmin)) && message.channel.id === ChannelLabStatus) {
                BotClient.user.setActivity("Game Lab OPEN");
                BotClient.user.setStatus("online");
                labOpen = true;
                console.log("Lab is now marked as OPEN.");
            }
            break;
        }
        case "labclosed": {
            if ((message.member.roles.cache.has(RoleOfficer) || message.member.roles.cache.has(RoleAdmin)) && message.channel.id === ChannelLabStatus) {
                BotClient.user.setActivity("Game Lab CLOSED");
                BotClient.user.setStatus("dnd");
                labOpen = false;
                console.log("Lab is now marked as CLOSED.");
            }
            break;
        }
        case "version": {
            if ((message.member.roles.cache.has(RoleOfficer) || message.member.roles.cache.has(RoleAdmin)) && message.channel.id === ChannelLabStatus)
                message.channel.send("Lippo's current version is " + BotVersion + " (" + BotVersionMsg + ")");
            break;
        }
    }
}
function processCommandGameJam(message) {
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
BotClient.on("ready", function () {
    console.log("Connected as " + BotClient.user.tag);
    BotClient.user.setActivity("Game Lab CLOSED");
    BotClient.user.setStatus("dnd");
    BotClient.channels.cache.find(function (c) { return c.id === ChannelBotCommands; }).messages.fetchPinned(true);
    //let m1: Message = (BotClient.channels.cache.find(c => c.id === ChannelBotCommands) as TextChannel).messages.cache.find(m => m.id === MessagePronouns);
    //m1.reactions.
    /*
        let m1: Message = (BotClient.channels.cache.find(c => c.id === ChannelBotCommands) as TextChannel).messages.cache.find(m => m.id === MessagePronouns);
        const filter = (reaction, user) => reaction.emoji.name === '❤️';
    
        const collector = m1.createReactionCollector(filter);
    
        collector.on("collect", r => {
            console.log("REACTION COLLECTED");
        });
        
        
        collector.on("remove", r => {
            console.log("REACTION UNCOLLECTED");
        });*/
});
BotClient.on("message", function (receivedMessage) {
    if (receivedMessage.author === BotClient.user)
        return;
    // GAME JAM
    if (GameJamMode && receivedMessage.guild.id === ServerGameJam && receivedMessage.channel.id === ChannelGameJamRoles && receivedMessage.content[0] === '!')
        processCommandGameJam(receivedMessage);
    // Commands
    if (receivedMessage.guild.id === ServerVGDC && (receivedMessage.channel.id === ChannelBotCommands || receivedMessage.channel.id === ChannelLabStatus) && receivedMessage.content[0] === '!')
        processCommand(receivedMessage);
    if (receivedMessage.guild.id === ServerVGDC && receivedMessage.content.search(SecretLabRegex) !== -1) {
        receivedMessage.channel.send(mention(receivedMessage.author.id) + " I think you mean \"Quiet Lab.\"");
    }
    /* if (receivedMessage.guild.id === ServerVGDC && receivedMessage.content.search(QuestionRegex) !== -1) {
        receivedMessage.channel.send(`${mention(receivedMessage.author.id)} Hi there. I happened to hear you ask whether the lab is open. ${labOpen ? "Yes. It is." : "No. It's not."} Have a wonderful day.`);
        return;
    } */
});
BotClient.on("messageReactionAdd", function (messageReaction, user) {
    if (messageReaction.message.channel.id === ChannelBotCommands) {
        console.log("REACTION ADDED in channel");
        switch (messageReaction.emoji.identifier) {
            case ReactionID1:
                messageReaction.message.guild.member(user).roles.add(Role1);
                break;
            case ReactionID2:
                messageReaction.message.guild.member(user).roles.add(Role2);
                break;
            case ReactionID3:
                messageReaction.message.guild.member(user).roles.add(Role3);
                break;
            case ReactionID4:
                messageReaction.message.guild.member(user).roles.add(Role4);
                break;
            case DepartmentID1:
                messageReaction.message.guild.member(user).roles.add(RoleArt);
                break;
            case DepartmentID2:
                messageReaction.message.guild.member(user).roles.add(RoleAudio);
                break;
            case DepartmentID3:
                messageReaction.message.guild.member(user).roles.add(RoleDesign);
                break;
            case DepartmentID4:
                messageReaction.message.guild.member(user).roles.add(RoleProduction);
                break;
            case DepartmentID5:
                messageReaction.message.guild.member(user).roles.add(RoleProgramming);
                break;
            case DepartmentID6:
                messageReaction.message.guild.member(user).roles.add(RoleWriting);
                break;
        }
    }
});
BotClient.on("messageReactionRemove", function (messageReaction, user) {
    if (messageReaction.message.channel.id === ChannelBotCommands) {
        console.log("REACTION REMOVED in channel");
        switch (messageReaction.emoji.identifier) {
            case ReactionID1:
                messageReaction.message.guild.member(user).roles.remove(Role1);
                break;
            case ReactionID2:
                messageReaction.message.guild.member(user).roles.remove(Role2);
                break;
            case ReactionID3:
                messageReaction.message.guild.member(user).roles.remove(Role3);
                break;
            case ReactionID4:
                messageReaction.message.guild.member(user).roles.remove(Role4);
                break;
            case DepartmentID1:
                messageReaction.message.guild.member(user).roles.remove(RoleArt);
                break;
            case DepartmentID2:
                messageReaction.message.guild.member(user).roles.remove(RoleAudio);
                break;
            case DepartmentID3:
                messageReaction.message.guild.member(user).roles.remove(RoleDesign);
                break;
            case DepartmentID4:
                messageReaction.message.guild.member(user).roles.remove(RoleProduction);
                break;
            case DepartmentID5:
                messageReaction.message.guild.member(user).roles.remove(RoleProgramming);
                break;
            case DepartmentID6:
                messageReaction.message.guild.member(user).roles.remove(RoleWriting);
                break;
        }
    }
});
// =========================================================================
var token = fs.readFileSync(TokenFile).toString();
BotClient.login(token);
