const message = require('./message')
const message_games = require('./get_message_games')
const getPrice = require('./getPrice')
const {attrList} = require('./makeUrl')
const json_games = require('./get_json_games')
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
	
	if(typeof text[0] !== 'undefined' && text[0] === '!som')
	{  
		if(typeof text[1] !== 'undefined')  
		{  
			let server_name;
			server_name = text.join(' ');
			server_name = server_name.replace('!som','').replace(' ','');
			 
			let set_info = {
				name : 'wow_som',
				server : server_name.toLowerCase().trim()
			};  
		   
			const botIcon = client.user.displayAvatarURL();
            const price = await json_games(set_info); 
            const capitalize = w =>  w[0].toUpperCase() + w.slice(1).toLowerCase();
    
            if(price.aliance != 'N/A' && price.horde != 'N/A'){
                const aliance =  message_games({
					type:'Aliance', 
					server:capitalize(server_name), 
					price:price.aliance, 
					avatar:botIcon, 
					abreviatura:'SOM', 
					title:'WOW Classic Gold (ERA) - Season Of Mastery', 
					thumbnail: 'https://i.imgur.com/qFlBXpU.png', 
					amount:'1 Oro'
				});
                const horde =  message_games({
					type:'Horde', 
					server:capitalize(server_name), 
					price:price.horde, 
					avatar:botIcon, 
					abreviatura:'SOM', 
					title:'WOW Classic Gold (ERA) - Season Of Mastery', 
					thumbnail: 'https://i.imgur.com/qFlBXpU.png', 
					amount:'1 Oro'
				});
                msg.author.send(aliance);
                msg.author.send(horde);
            }else{
                const err =  message_games({
					type:'Error', 
					avatar:botIcon,
					abreviatura:'SOM'
				});
                msg.author.send(err);
            }
			
		}
	}
	
	if(typeof text[0] !== 'undefined' && text[0] === '!nw')
	{  
		if(typeof text[1] !== 'undefined')  
		{ 
			let server_name;
			server_name = text.join(' ');
			server_name = server_name.replace('!nw','').replace(' ','');
			 
			let set_info = {
				name : 'new_world',
				server : server_name.toLowerCase().trim()
			};  
		   
			const botIcon = client.user.displayAvatarURL();
            const price = await json_games(set_info); 
            const capitalize = w =>  w[0].toUpperCase() + w.slice(1).toLowerCase();
    
            if(price.price != 'N/A'){
                const msj_precio =  message_games({
					type:'US East', 
					server:capitalize(server_name), 
					price:price.price, 
					avatar:botIcon, 
					abreviatura:'NW', 
					title:'New World', 
					thumbnail: 'https://i.imgur.com/NRWZd3m.jpg', 
					amount:'1000'
				});
                msg.author.send(msj_precio);
            }else{
                const err =  message_games({
					type:'Error', 
					avatar:botIcon,
					abreviatura:'NW'
				});
                msg.author.send(err);
            }
			
		}
	}
	
	if(typeof text[0] !== 'undefined' && text[0] === '!osrs')
	{   
		let server_central = 'Old school';
		
		if(typeof server_central !== 'undefined')   
		{ 
			let server_name; 
			server_name = server_central.replace('!osrs','');
			 
			let set_info = {
				name : 'old_runescape',
				server : server_name.toLowerCase().trim()
			};   
			
			const botIcon = client.user.displayAvatarURL();
            const price = await json_games(set_info); 
            const capitalize = w =>  w[0].toUpperCase() + w.slice(1).toLowerCase();
    
            if(price.price != 'N/A'){
                const msj_precio =  message_games({
					type:'OS', 
					server:capitalize(server_name), 
					price:price.price, 
					avatar:botIcon, 
					abreviatura:'OSRS', 
					title:'Old school', 
					thumbnail: 'https://i.imgur.com/9UiFojx.png', 
					amount:'1m Oro'
				});
                msg.author.send(msj_precio);
            }else{
                const err =  message_games({
					type:'Error', 
					avatar:botIcon,
					abreviatura:'OSRS'
				});
                msg.author.send(err);
            }
			
		}
	}
	
	if(typeof text[0] !== 'undefined' && text[0] === '!rs3')
	{  
		let server_central = 'Main Server';
		
		if(typeof server_central !== 'undefined')  
		{ 
			let server_name; 
			server_name = server_central.replace('!rs3','');
			 
			let set_info = {
				name : 'runescape3',
				server : server_name.toLowerCase().trim()
			};    
		   
			const botIcon = client.user.displayAvatarURL();
            const price = await json_games(set_info); 
            const capitalize = w =>  w[0].toUpperCase() + w.slice(1).toLowerCase();
    
            if(price.price != 'N/A'){
                const msj_precio =  message_games({
					type:'R', 
					server:capitalize(server_name), 
					price:price.price, 
					avatar:botIcon, 
					abreviatura:'RS3', 
					title:'Runescape 3', 
					thumbnail: 'https://i.imgur.com/xXgNhWL.png', 
					amount:'1m Oro'
				});
                msg.author.send(msj_precio);
            }else{
                const err =  message_games({
					type:'Error', 
					avatar:botIcon,
					abreviatura:'RS3'
				});
                msg.author.send(err);
            }
			
		}
	}
	
	if(typeof text[0] !== 'undefined' && text[0] === '!albion')
	{  
		let server_central = 'Main Server';
		
		if(typeof server_central !== 'undefined')  
		{ 
			let server_name; 
			server_name = server_central.replace('!albion','');
			 
			let set_info = {
				name : 'albion_online',
				server : server_name.toLowerCase().trim()
			};  
		 
			const botIcon = client.user.displayAvatarURL();
            const price = await json_games(set_info); 
            const capitalize = w =>  w[0].toUpperCase() + w.slice(1).toLowerCase();
    
            if(price.price != 'N/A'){
                const msj_precio =  message_games({
					type:'Silver', 
					server:capitalize(server_name), 
					price:price.price, 
					avatar:botIcon, 
					abreviatura:'ALBION', 
					title:'Albion Online', 
					thumbnail: 'https://i.imgur.com/X03ajV9.png', 
					amount:'1m Silver'
				});
                msg.author.send(msj_precio);
            }else{
                const err =  message_games({
					type:'Error', 
					avatar:botIcon,
					abreviatura:'ALBION'
				});
                msg.author.send(err);
            }
			
		}
	}
	
	if(typeof text[0] !== 'undefined' && text[0] === '!lostark')
	{  
		if(typeof text[1] !== 'undefined')  
		{ 
			let server_name;
			server_name = text.join(' ');
			server_name = server_name.replace('!lostark','').replace(' ','');
			 
			let set_info = {
				name : 'lost_ark',
				server : server_name.toLowerCase().trim()
			};  
		   
			const botIcon = client.user.displayAvatarURL();
            const price = await json_games(set_info); 
            const capitalize = w =>  w[0].toUpperCase() + w.slice(1).toLowerCase();
    
            if(price.price != 'N/A'){
                const msj_precio =  message_games({
					type:'US', 
					server:capitalize(server_name), 
					price:price.price, 
					avatar:botIcon, 
					abreviatura:'LOST ARK', 
					title:'Lost Ark', 
					thumbnail: 'https://media.discordapp.net/attachments/932397428294959164/944723721170587699/lordark.jpg', 
					amount:'1000'
				});
                msg.author.send(msj_precio);
            }else{
                const err =  message_games({
					type:'Error', 
					avatar:botIcon,
					abreviatura:'LOSTARK'
				});
                msg.author.send(err);
            }
			
		}
	}

});
