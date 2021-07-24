const message = require('./message')
const getPrice = require('./getPrice')
const {attrList} = require('./makeUrl')
const {Client} = require('discord.js');
const client = new Client();

client.login('ODY4MTkxNTgwNzIzNDg2NzUw.YPsEaw.6YHbxxs03LxBTUh3Ddnu2dWi2q8');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {

    const text = msg.content.toLowerCase().split(' ')
    
	if (text[0] === '!tbc') {
        
        if(text[1] && attrList[text[1]]){
            
            const botIcon = client.user.displayAvatarURL()
            const price = await getPrice(text[1])
            const capitalize = w =>  w[0].toUpperCase() + w.slice(1).toLowerCase()
    
            if(price.aliance != 'N/A' && price.horde != 'N/A'){
                const aliance =  message({type:'Aliance', server:capitalize(text[1]), price:price.aliance, avatar:botIcon})
                const horde   =  message({type:'Horde', server:capitalize(text[1]), price:price.horde, avatar:botIcon})
                msg.author.send(aliance)
                msg.author.send(horde)
            }else{
                const err =  message({type:'Error', avatar:botIcon})
                msg.author.send(err)
            }

        }



	}

});
