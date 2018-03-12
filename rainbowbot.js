const Discord = require('discord.js');
var bot = new Discord.Client();

var H = process.env.H;
var S = process.env.C;
var L = process.env.L;
var R0 = R1 = G0 = G1 = B0 = B1 = 0;
var step = 20;
var col = 0;


bot.on('ready',() => {
    bot.user.setPresence({ game: { name: 'Rainbow!', type: 0} });
    console.log("bot launched");
});

bot.on('message', message => {

    H = (H + step) % 360;
S = 0.90;
L = 0.50;

process.env.H = H;
process.env.S = S;
process.env.L = L;

var H0 = H/60
    
var C = (1 - Math.abs((2 * L) - 1)) * S;
var X = C * (1 - Math.abs(H0 % 2- 1));
var m = L - C / 2;
 
if (H0 < 1){
    R1 = C;
    G1 = X;
    B1 = 0;
}else if (H0 < 2){
    R1 = X;
    G1 = C;
    B1 = 0;
}else if (H0 < 3){
    R1 = 0;
    G1 = C;
    B1 = X;
}else if (H0 < 4){
    R1 = 0;
    G1 = X;
    B1 = C;
}else if (H0 < 5){
    R1 = X;
    G1 = 0;
    B1 = C;
}else if (H0 < 6){
    R1 = C;
    G1 = 0;
    B1 = X;
};

console.log(H + " / " + R1 + " " + G1 + " " + B1);
    
R0 = Math.round((R1 + m) * 255);
G0 = Math.round((G1 + m) * 255);
B0 = Math.round((B1 + m) * 255);

console.log("color","dec:" + col + " / H:" + H + " S:" + S + " L:" + L + " / R:"+ R0 + " G:" + G0 + " B:" + B0)
col = Math.round(R0 * Math.pow(256,2) + G0 * 256 + B0);
bot.guilds.get(process.env.SERVER_ID).roles.find('name',"Rainbow").setColor(col);


})
bot.login(process.env.BOT_TOKEN);
