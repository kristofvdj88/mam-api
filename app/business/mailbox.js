const config = require('../config/config');
const request = require('request');


const mailbox = {};

const baseUrl = `https://api.telegram.org/bot${config.TELEGRAM_TOKEN}`;


mailbox.handle = (json) => {
    console.info('mailbox.handle');

    postDataToTelegramChannelBot(json);
};

const postDataToTelegramChannelBot = (json) => {
    console.info('postDataToTelegramChannelBot');

    let message = json.mail ? 'Jullie hebben post ontvangen!' : `De post is opgehaald op ${json.dateTime}.`;

    request(`${baseUrl}/sendMessage?chat_id=${config.TELEGRAM_CHANNEL_NAME}&text=${message}`, { json: true }, (err, res, body) => {
        if (err) { return console.error(err); }
        console.log(body.url);
        console.log(body.explanation);
      });
};


module.exports = mailbox;