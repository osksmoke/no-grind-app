const {MessageEmbed} = require('discord.js');

const message_games = props =>{

    const {type, server, price, avatar, abreviatura, title, thumbnail, amount} = props
    let color = '';

    type == 'Aliance' ? color = 0x00bce8 : color = 0xff0000

    if(type == 'Error'){

        return new MessageEmbed()
        .setTitle('Connection Error')
        .setDescription('A connection error has occurred, please try again')
        .setColor(color)
        .setAuthor(abreviatura, avatar)
        .setFooter('NoGrind © 2022')

    }else{
        
        return new MessageEmbed()
        .setTitle(title+' - '+type)
        .setColor(color)
        .setAuthor(abreviatura, avatar)
        .setThumbnail(thumbnail)
        .setFooter('NoGrind © 2022')
        .addFields(
            { name: 'Price 💵', value: price, inline: true },
            { name: 'Amount 💰', value: amount, inline: true },
            { name: 'Server 📶', value: server, inline: true },
        )
    }

     
}

module.exports = message_games