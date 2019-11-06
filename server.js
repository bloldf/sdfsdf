const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://familiar-vibraphone.glitch.me/`);
}, 280000);
 
// كل البكجات الي ممكن تحتجها في اي بوت
const { Client, RichEmbed } = require("discord.js");
var { Util } = require('discord.js');
const {TOKEN, YT_API_KEY, prefix, devs} = require('./config')
const client = new Client({ disableEveryone: true})
const ytdl = require("ytdl-core");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const botversion = require('./package.json').version;
const simpleytapi = require('simple-youtube-api')
const moment = require("moment");
const fs = require('fs');
const util = require("util")
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require('snekfetch');
const guild = require('guild');
const dateFormat = require('dateformat');//npm i dateformat
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
client.login(TOKEN);
const queue = new Map();
var table = require('table').table
const Discord = require('discord.js');
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 

//1
client.on("message", message => {
let args = message.content.split(' ');
let prefix = "#";//بريفيكس
if(args[0].toLowerCase() === (prefix + 'calc')){
    const math = require("mathjs");
    const ssff = message.content.split(' ').slice(1).join(' ');
    const responsee = math.eval(ssff);
    if(!ssff){
        return message.channel.send(`عليك ان تحدد مسألة حسابية حقيقية`);
    }
    let embed = new Discord.RichEmbed();
    embed.setTitle(`آلة حاسبة`);
    embed.setThumbnail('https://cdn.glitch.com/4ef047b0-9b5f-43f2-9916-7051efecb5c5%2Fa2833fa0-ac33-4dc7-9e22-0fa97f5acc26.image.png?v=1572272026117');
    embed.setTimestamp();
    embed.setFooter(message.author.tag,message.author.displayAvatarURL);
    embed.setColor(`#ff0000`);
    embed.addField(`السؤال`,`\`\`\`js\n${ssff}\`\`\``);
    embed.addField(`االجواب`,`\`\`\`js\n${responsee}\`\`\``);
    message.channel.send(embed);
}
});



const sql = require('sqlite');
const path = require('path');
sql.open(path.join(__dirname, 'credits.sql')) // read sql file
.then(() => { // then ?
	console.log('Opened') // if the sql opened
	sql.run(`CREATE TABLE IF NOT EXISTS creditSysteme (id VARCHAR(30), credits BIGINT, timeDaily BIGINT)`) // create new table if the table does'nt exosts
})
.catch(err => console.error(err)) // if the sql file does'nt exists

client.on("message", async msg => { // event message
	if(!msg.channel.guild) return; // channel guild
	let men = msg.mentions.users.first() || msg.author; // the mention or the author
	let prize =  msg.content.split(" ").slice(2).join(" ") // prize

	if(msg.content.startsWith(prefix+"credits")) { // if the message content credits do 
		if(!men || !men === undefined) return msg.channel.send("** :interrobang: | "+men.username+", I can't find "+men.username+"!**"); // undefind user
		if(!prize) {
		sql.get(`SELECT * FROM creditSysteme WHERE id = '${men.id}'`).then(res => { // select user from table
			if(!res) sql.run(`INSERT INTO creditSysteme VALUES ('${men.id}', 0, 0)`) // if the user does'nt exisit in table
			if(res) { // if user exsist
					msg.channel.send("**"+men.username+" :credit_card: balance is ``"+res.credits+"$``.**") // reply
			}
		})
		}else{ // else ?
			if(isNaN(prize)) return msg.channel.send(" :interrobang: | "+msg.author.username+", type the credit you need to transfer!"); // is nan :)
			if(parseFloat(prize) === NaN) return msg.channel.send(" :interrobang: | "+msg.author.username+", type the credit you need to transfer!"); // if nan :))
			if(men === msg.author) return; // if the men = author
			let authorRes = await sql.get(`SELECT * FROM creditSysteme WHERE id = '${msg.author.id}'`) // select from sql
			let userRes = await sql.get(`SELECT * FROM creditSysteme WHERE id = '${men.id}'`) // select from sql
			if(!authorRes) sql.run(`INSERT INTO creditSysteme VALUES ('${msg.author.id}', 0, 0)`) // if !user create new col 
			if(!userRes) sql.run(`INSERT INTO creditSysteme VALUES ('${men.id}', 0, 0)`) // if !user create new col 
			let authorCredits = authorRes.credits; // credits before transfer
			let userCredits = userRes.credits; // credits before transfer
			if(parseFloat(prize) > authorCredits) return msg.channel.send("** :thinking: | "+msg.author.username+", Your balance is not enough for that!**"); // if the balance hight then prize
			sql.run(`UPDATE creditSysteme SET credits = ${authorCredits - parseInt(prize)} WHERE id = '${msg.author.id}'`); // uptade credits for the author
			sql.run(`UPDATE creditSysteme SET credits = ${userCredits + parseInt(prize)} WHERE id = '${men.id}'`); // update credits for the mentions user
			msg.channel.send("**:moneybag: | "+msg.author.username+", has transferred ``$"+prize+"`` to "+men.toString()+"**") // the message :)
		}
	} else if(msg.content.startsWith(prefix+"daily")) {  // if the message content daily do
		let daily = 86400000; // 24h
		let amount = Math.floor((Math.random() * 500) + 1) // Money
    let res = await sql.get(`SELECT * FROM creditSysteme WHERE id = '${msg.author.id}'`) // select from sql
		if(!res) sql.run(`INSERT INTO creditSysteme VALUES ('${men.id}', 0, 0)`) // if !user create new col 
    let time = res.timeDaily; // select last daily
    let credits = res.credits; // credits before daily
    if(time != null && daily - (Date.now() - time) > 0) { // if already climed the daily in same day

			let fr8 = ms(daily - (Date.now() - time)); // the remining time
			msg.channel.send("**:stopwatch: | "+msg.author.username+", your daily :yen: credits refreshes in "+fr8.hours+" hours and "+fr8.seconds+" seconds. **") //reply

		}else{ // if does'nt clim her daily in 24h
			msg.channel.send("**:atm:  |  "+msg.author.username+", you received your :yen: "+amount+" daily credits!**"); // reply
			sql.run(`UPDATE creditSysteme SET credits = ${credits + amount}, timeDaily = ${Date.now()} WHERE id = '${msg.author.id}'`); // add amount to the credits before daily
		}
	}
})
///Nore Codes


client.on('message', message => {
  if(message.content === prefix + "user"){
    var embed = new Discord.RichEmbed()
    .setTitle(message.author.tag, message.author.avatarURL)
    .addField(`User`, message.author.username)
    .addField(`Discrim`,`#`+ message.author.discriminator)
    .addField(`Name Color Role`, message.member.colorRole)
    .addField(`Game`,message.author.presence.game ||"Idel.")
    .addField(`Status`,message.author.presence.status)
    message.channel.send(embed);
  }
});