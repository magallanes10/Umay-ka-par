module.exports.config = {
  name: "pastebin-alert",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonell Magallanes",
  description: "Pastebin Alert",
  commandCategory: "Custom",
  usages: "https://pastebin.com/raw/[id]",
  cooldowns: 5,
};

const fs = require('fs');
const axios = require('axios');
const request = require('request');

module.exports.handleEvent = function({ api, event }) {
  let threadID = event.threadID;
  let messageID = event.messageID;
  let text = event.body;
  let regex = /https:\/\/pastebin\.com\/raw\/\S+$/g;

  if(regex.test(text)) {
    var link = 'https://i.postimg.cc/3RLHGcJp/New-Project-1212-79-D6215.png';
    var callback = () => api.sendMessage({ body: `Pastebin link detected! some user paste the link of pastebin of this group`, attachment: fs.createReadStream(__dirname + "/cache/alert.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/alert.jpg", event.messageID));
    return request(link).pipe(fs.createWriteStream(__dirname + "/cache/alert.jpg")).on("close", () => callback());
  }
}

module.exports.run = async function({ api, event }) {
  let threadID = event.threadID;
  let messageID = event.messageID;
  let text = event.body;
  let regex = /https:\/\/pastebin\.com\/raw\/\S+$/g;

  if(regex.test(text)) {
    let imageUrl = 'https://i.postimg.cc/7LytZnDk/Screenshot-2023-11-01-23-32-56-32.jpg';
    let responseText = 'Pastebin Alert!';
    try {
      let response = await axios.get(text);

      if(response.status == 200){
        var link = imageUrl;
        var callback = () => api.sendMessage({ body: responseText, attachment: fs.createReadStream(__dirname + "/cache/alert.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/alert.jpg", event.messageID));
        return request(link).pipe(fs.createWriteStream(__dirname + "/cache/alert.jpg")).on("close", () => callback());
      }else{
        return api.sendMessage('Invalid Pastebin URL', threadID, messageID);
      }
    }catch(err){
      return api.sendMessage('Something went wrong', threadID, messageID);
    }
  }
}