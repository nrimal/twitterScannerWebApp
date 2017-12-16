const twilio = require('twilio');
const config = require('./keyConfig');
var twilioClient = new twilio(config.twilioAccSID, config.twilioAuthToken);
var userPhone = require('./userPhone')

function sendMessage(userID, messagesRecv) {
    try {
        //need to create a filter system that filters all the message and remove duplicate aka with most match
        let count = 0;

        for (let message of messagesRecv){
            twilioClient.messages.create({
                body: message,
                to: userPhone.getPhoneNum(userID),
                from: "+16147411473"
            })
                .then((message) => console.log(message.sid));
            count++;
            if (count = 2) { //temporary so, user isn't spamed
                break;
            }
        };
    } catch (e) {
        console.error("Error sending text");
        console.log(e);
        return;
    }

};

module.exports = {
    sendMessage: sendMessage
}