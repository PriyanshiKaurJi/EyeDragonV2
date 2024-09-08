const { findUid } = global.utils;
const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

module.exports.config = {
	name: "uid",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭", //Modified by Priyanshi Kaur
	description: "Get User ID.",
	commandCategory: "Tools",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
	if (event.messageReply) {
		return api.sendMessage(`${event.messageReply.senderID}`, event.threadID, event.messageID);
	}
	
	if (!args[0]) {
		return api.sendMessage(`${event.senderID}`, event.threadID, event.messageID);
	}
	
	if (args[0].match(regExCheckURL)) {
		let msg = '';
		for (const link of args) {
			try {
				const uid = await findUid(link);
				msg += `${link} => ${uid}\n`;
			}
			catch (e) {
				msg += `${link} (ERROR) => ${e.message}\n`;
			}
		}
		return api.sendMessage(msg, event.threadID, event.messageID);
	}
	
	if (Object.keys(event.mentions).length > 0) {
		for (var i = 0; i < Object.keys(event.mentions).length; i++) {
			api.sendMessage(`${Object.values(event.mentions)[i].replace('@', '')}: ${Object.keys(event.mentions)[i]}`, event.threadID);
		}
		return;
	}
	
	return api.sendMessage("Please tag someone, provide a profile link, or leave empty to get your own UID.", event.threadID, event.messageID);
}
