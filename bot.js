var HTTPS = require('https');
var rules = "Rules for Florida: 
1) NO Pranks of ANY kind.
2) No messing with each others things/food/phone/belongings/etc. 
3) No aggravating Kilby. 
4) No talking when someone is giving directions.
5) Always use heck
6) No jokes about Kyle and Kyra, or and especially, Patrick and Cally.
7) If you do make jokes, make sure they dont find out. 
8) NO water rides. Trust me. The after feeling on the bus is the worst. 
9) If there is a waffle House option for food, it is required for the squad to attend.
10) BBH on this trip.
11) No racist, sexist, slurs and jokes of any kind in the park.
12) If weird people approach you, respond in a way that would make the squad laugh.
13) Story time is a recap of our day. Story time begins when we get back to the hotel. No interrupting during the other persons story. ";

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/rules$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(rules);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = rules();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
