const Discord = require('discord.js');
const client = new Discord.Client();

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

/*
var mysql = require('mysql');

var con = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});
*/

function duel(msg, author, rare, textResult) {
  var opp = msg.mentions.users.first().username;
  var roll = Math.round(Math.random() * 100);
  msg.channel.send(author + " duels " + opp + "!");
  var winStyle;
  var winner;
  if (roll > 50) {
    winner = 1;
    if (roll > 75) {
      if (roll > 90){
          winStyle = 3;
      } else {
          winStyle = 2;
      }
    } else {
        winStyle = 1;
    }
  } else {
    winner = 0;
    if (roll < 25) {
      if (roll < 10) {
        winStyle = 3;
      } else {
        winStyle = 2;
      }
    } else {
      winStyle = 1;
    }
  }
  if (winStyle == 1) {
    if (winner == 1) {
        msg.channel.send(author + " defeats " + opp + " with a score of " + roll + " - " + (100-roll));
    } else {
        msg.channel.send(opp + " defeats " + author + " with a score of " + roll + " - " + (100-roll));
    }
  } else if (winStyle == 2) {
      if (winner == 1) {
          msg.channel.send(author + " convincingly defeats " + opp + " with a score of " + roll + " - " + (100-roll));
      } else {
          msg.channel.send(opp + " convincingly defeats " + author + " with a score of " + roll + " - " + (100-roll));
      }
  }else if (winStyle == 3) {
      if (winner == 1) {
          msg.channel.send(author + " absolutely destroys " + opp + " with a score of " + roll + " - " + (100-roll));
      } else {
          msg.channel.send(opp + " absolutely destroys " + author + " with a score of " + roll + " - " + (100-roll));
      }
  }
}

function fliptable(msg, author, rare) {
  if (rare <= 0.05) {
      if (rare <= 0.01) {
          msg.channel.send(" (╯'□')╯︵ ┻━┻  (╯'□')╯︵ ┻━┻  (╯'□')╯︵ ┻━┻");
          msg.channel.send("FLIP ALL THE TABLES!");
      } else {
          msg.channel.send(author + " flips a table out the god damn window!");
      }
  } else {
    msg.channel.send(author + " flips a table.");
  }
}

function echoMsg(msg, rare) {
  if (rare <= 0.05) {
      msg.channel.send(msg.content.substr(6).toUpperCase() + "!!!!");
  } else {
      msg.channel.send(msg.content.substr(6));
  }
}

function slap(msg, author, rare) {
  const victim = msg.mentions.users.first().username;
  if (rare <= 0.05) {
      if (rare <= 0.01) {
          msg.channel.send(author + " bitch slaps " + victim + " across the face with a giant, black dildo.");
      } else {
          msg.channel.send(author + " bitch slaps " + victim + " across the face.");
      }
  } else {
      if (rare >= 0.95) {
          if (rare >= 0.99) {
              msg.channel.send(victim + " punches " + author + " in the face before they can strike!");
          } else {
              msg.channel.send(victim + " catches " + author + "'s hand and slaps them with it!");
          }
      } else {
          msg.channel.send(author + " slaps " + victim + ".");
      }
  }
}

function rollDice(msg, numTimes) {
	if (numTimes <= 5) {
		for (var i=0; i < numTimes; i++)
			msg.channel.send("Roll: " + Math.ceil(Math.random() * 6));
	} else {
		msg.channel.send("Limit of 5 rolls per command");
	}
}

function flipCoin(msg, numTimes) {
	if (numTimes <= 5) {
		for (var i=0; i < numTimes; i++) {
			var side = Math.ceil(Math.random() * 2);
			if (side == 1)
				msg.channel.send("Heads");
			else
				msg.channel.send("Tails");
		}
	} else {
		msg.channel.send("Limit of 5 flips per command");
	}
}

function drawCard(msg, numTimes) {
	if (numTimes <= 5) {
		for (var i=0; i < numTimes; i++) {
			var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
			var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
			var num = Math.floor(Math.random() * 13);
			var suitNum = Math.floor(Math.random() * 4)
			msg.channel.send(cards[num] + " of " + suits[suitNum]);
		}
	} else {
		msg.channel.send("Limit of 5 draws per command");
	}
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.author.id != 410998839089168394) {
      if (msg.content === 'Kerry') {
          msg.reply('is a nerd');
      } else if (msg.content === 'ping') {
          msg.reply('pong');
      } else if (msg.content === 'What is your purpose?') {
          msg.channel.send("To smoke hookers and bang weed. Gonna tear this town up.");
      } else if (msg.content === 'ding') {
          msg.reply('dong');
      }
    
    // COMMAND LIST
      if (msg.content.substr(0, 2) == '!!') {
        const author = msg.author.username;
        const rare = Math.random();
        console.log(rare);
        var opp;
        var textResult = msg.content.substr(2).split(" ");
        switch (textResult[0].toLowerCase()) {
            case 'duel':
              duel(msg, author, rare, "");
              break;
            case 'fliptable':
              fliptable(msg, author, rare);
              break;
            case 'echo':
              echoMsg(msg, rare);
              break;
            case 'slap':
			  slap(msg, author, rare);
			  break;
			case 'rolldice':
				if(textResult.length > 1) {
					rollDice(msg, textResult[1]);
				} else {
					rollDice(msg, 1);
				}
				break;
			case 'flipcoin':
				if(textResult.length > 1) {
					flipCoin(msg, textResult[1]);
				} else {
					flipCoin(msg, 1);
				}
				break;
			case 'drawcard':
				if(textResult.length > 1) {
					drawCard(msg, textResult[1]);
				} else {
					drawCard(msg, 1);
				}
				break;
        }
      }
  }
});

client.login(process.env.CLIENT_LOGIN);
