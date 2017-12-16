const express = require('express')
const app = express()
const Twitter = require('twitter');
const config = require('./keyConfig');
const twilioHelper = require('./twilioHelper');

var client = new Twitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: config.accessToken,
    access_token_secret: config.tokenSecret
});

var requestScanning = [
    { user: "OUAB", keyword: ["ticket", "tickets", "tix"], userID: 123, sinceID: 1 }
]; //contains a users request for twitter profile to scan


setInterval(() => {

    requestScanning.forEach(req => {
        var params = {
            screen_name: req.user,
            count: 50,
            since_id: req.sinceID
        };

        let messagesToSend = []

        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (error) {
                console.log(error);
                return;
            }

            tweets.forEach(tweet => {
                req.keyword.forEach((searchKey) => {  //iteriate each search keyword
                    var temp = tweet.text.toLowerCase();
                    if (temp.indexOf(searchKey) != -1) {
                        messagesToSend.push(tweet.text);
                    }
                });
                // console.log(tweet.text);
            });

            if (messagesToSend.length > 0) {
                twilioHelper.sendMessage(req.userID, messagesToSend);
            }
            req.sinceID = tweets.length > 0 ? tweets[0].id : req.sinceID; //only update sinceID if tweets are found
        });
        // console.log("sinceID::" + params.since_id);
    });
}, 10000);


app.get('/', (req, res) => res.send('Running now'));
app.listen(8000, () => console.log('Example app listening on port 8000!'))