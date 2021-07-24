const {MessageEmbed} = require('discord.js');

const message = props =>{

    const {type, server, price, avatar} = props
    let color = '';

    type == 'Aliance' ? color = 0x00bce8 : color = 0xff0000

    if(type == 'Error'){

        return new MessageEmbed()
        .setTitle(`Connection Error`)
        .setDescription('A connection error has occurred, please try again')
        .setColor(color)
        .setAuthor('TBC', avatar)
        .setFooter('NoGrind © 2021')

    }else{
        
        return new MessageEmbed()
        .setTitle(`World of warcraft TBC Classic - ${type}` )
        .setColor(color)
        .setAuthor('TBC', avatar)
        .setThumbnail('https://media.discordapp.net/attachments/840629334725230642/848313004914638848/logo_na.png?width=80&height=64')
        .setFooter('NoGrind © 2021')
        .addFields(
            { name: 'Price 💵', value: `${price}$`, inline: true },
            { name: 'Amount 💰', value: '1000', inline: true },
            { name: 'Server 📶', value: server, inline: true },
        )
    }

     
}

module.exports = message