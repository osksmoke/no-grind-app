const axios = require('axios');
const cheerio = require('cheerio');
  
// Herramientas  
function slug(str){  
    str = str.replace(/^\s+|\s+$/g, '-'); // trim
	str = str.toLowerCase();

	let from = [
		'а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф',
		'х', 'ц', 'ч', 'ш','щ', 'ъ', 'ь', 'ю', 'я'];
	let to = [
		'a', 'b', 'v', 'g', 'd', 'e', 'zh', 'z', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f',
		'h', 'c', 'ch', 'sh','sht', 'y', '', 'iu', 'ia'];
	for (let key in from) {
		str = str.replace(new RegExp(from[key], 'g'), to[key])
	}

	str = str.replace(/[^a-z0-9 -]/g, '-') // remove invalid chars
			 .replace(/\s+/g, '-'); // collapse dashes

	return str;
}

// Service Id => lgc_service_1 es Game Coins
const list_games = {
	wow_tbc:{ 
		service_id:'lgc_service_1', 
        id:'lgc_game_29076',
		region:{
			us:'dfced32f-2f0a-4df5-a218-1e068cfadffa' 
		}
    },
    wow_som:{ 
		service_id:'lgc_service_1', 
        id:'lgc_game_27816',
		region:{
			us:'dfced32f-2f0a-4df5-a218-1e068cfadffa' 
		}
    },
	new_world:{
		service_id:'lgc_service_1',
        id:'lgc_game_27266',
		region:{
			us:'dfced32f-2f0a-4df5-a218-1e068cfadffa' 
		}
    },
	albion_online:{
		service_id:'lgc_service_1',
        id:'lgc_game_21695',
		region:{
			us: null 
		}
    },
	old_runescape:{
		service_id:'lgc_service_1',
        id:'lgc_game_19746',
		region:{
			us: null 
		}
    },
	runescape3:{
		service_id:'lgc_service_1',
        id:'lgc_game_19747',
		region:{
			us: null 
		}
    },
	lost_ark:{
		service_id:'lgc_service_1',
        id:'lgc_game_23027',
		region:{
			us:'dfced32f-2f0a-4df5-a218-1e068cfadffa' 
		}
    }
}	

const get_url = async url =>{

    try { 
        const pageContent = await axios.get(url);  
		return pageContent.data; 
    } catch(err) {
        return 'N/A';
    }
}

const scraping = async function(url,name){

    try { 
        const pageContent = await axios.get(url);
        const $ = cheerio.load(pageContent.data);
    
        const rows = $('div#pre_checkout_sls_offer > div > .other-seller-offeer_mainbox > .other_offer-desk-main-box')
        .map((_, el) => {
            el = $(el);
            const price = el.find('.offer-price-amount').text();
            return {price};
        }).get();

        const price = rows[0].price;
		let result;
		 
		if(name == 'wow_tbc')
		{
			result = (price * 0.842)*1000;
		}  
		
		if(name == 'wow_som')
		{
			result = price * 0.78;
		}
		
		if(name == 'new_world')
		{
			result = price * 0.74;
		}
         
		if(name == 'old_runescape')
		{
			result = price * 0.79;
		}
		
		if(name == 'runescape3')
		{
			result = price * 0.715;
		}
		
		if(name == 'albion_online')
		{
			result = price * 0.72;
		}  
		
		if(name == 'lost_ark')
		{
			result = (price * 0.841)*1000;
		}  
        return result.toPrecision(4)

    } catch(err) {
        return 'N/A'
    } 
}
	
const get_json_games = async game => { 
	let url_keyword;
	let juego = list_games[game["name"]];
  
	if(juego['region']['us'] != null)
	{
		url_keyword = 'https://sls.g2g.com/offer/keyword_relation/collection?service_id='+juego['service_id']+'&brand_id='+juego['id']+'&region_id='+juego['region']['us'];
	}else 
	{
		url_keyword = 'https://sls.g2g.com/offer/keyword_relation/collection?service_id='+juego['service_id']+'&brand_id='+juego['id'];
	}
	
	let json_game = await get_url(url_keyword); 
	
	if(json_game != 'N/A')
	{
		let children = json_game['payload']['results'][0]['children'];
		let url_aliance = "";
		let url_horde = "";
		let url_precio = "";
		
		children.forEach(function(row) {
			let value = row['value'].toLowerCase(); 
			let regExp = new RegExp(game["server"].trim(), 'gi');
			let resul = value.match(regExp);  
			
			if(resul != null && resul[0] == game["server"]) 
			{      
				let slug_url = slug(value);  
				
				if(game["name"] == 'wow_tbc')
				{
					let url = 'https://www.g2g.com/offer/'+slug_url+'?service_id='+juego['service_id']+'&brand_id='+juego['id']+'&region_id='+juego['region']['us']+'&sort=lowest_price&include_offline=1&fa='+row['children'][0]['collection_id']+'%3A'+row['children'][0]['dataset_id'];
					let framer_value = value.split(' - ');
					let faction = framer_value[1].split(' ');
				
					if(!url_aliance.length && faction == 'alliance')
					{
						url_aliance = url; 
					}
					
					if(!url_horde.length && faction == 'horde')
					{
						url_horde = url;
					} 
				}
				
				if(game["name"] == 'wow_som')
				{
					let url = 'https://www.g2g.com/offer/'+slug_url+'?service_id='+juego['service_id']+'&brand_id='+juego['id']+'&region_id='+juego['region']['us']+'&sort=lowest_price&include_offline=1&fa='+row['children'][0]['collection_id']+'%3A'+row['children'][0]['dataset_id'];
					let framer_value = value.split(' - ');
					let faction = framer_value[1].split(' ');
				
					if(!url_aliance.length && faction == 'alliance')
					{
						url_aliance = url; 
					}
					
					if(!url_horde.length && faction == 'horde')
					{
						url_horde = url;
					} 
				}
				
				if(!url_precio.length && game["name"] == 'new_world')
				{  
					let url = 'https://www.g2g.com/offer/'+slug_url+'?service_id='+juego['service_id']+'&brand_id='+juego['id']+'&region_id='+juego['region']['us']+'&sort=lowest_price&include_offline=1&fa='+row['children'][0]['collection_id']+'%3A'+row['children'][0]['dataset_id'];
					url_precio = url; 
				}
				 
				if(!url_precio.length && game["name"] == 'old_runescape')
				{
					let url = 'https://www.g2g.com/offer/'+slug_url+'?service_id='+juego['service_id']+'&brand_id='+juego['id']+'&fa='+row['children'][0]['collection_id']+'%3A'+row['children'][0]['dataset_id']+'&sort=lowest_price&include_offline=1';
					url_precio = url; 
				}
				
				if(!url_precio.length && game["name"] == 'runescape3')
				{
					let url = 'https://www.g2g.com/offer/'+slug_url+'?service_id='+juego['service_id']+'&brand_id='+juego['id']+'&fa='+row['children'][0]['collection_id']+'%3A'+row['children'][0]['dataset_id']+'&sort=lowest_price&include_offline=1';
					url_precio = url; 
				}
				
				if(!url_precio.length && game["name"] == 'albion_online')
				{
					let url = 'https://www.g2g.com/offer/'+slug_url+'?service_id='+juego['service_id']+'&brand_id='+juego['id']+'&fa='+row['children'][0]['collection_id']+'%3A'+row['children'][0]['dataset_id']+'&sort=lowest_price&include_offline=1';
					url_precio = url; 
				} 
				
				if(!url_precio.length && game["name"] == 'lost_ark')
				{  
					let url = 'https://www.g2g.com/offer/'+slug_url+'?service_id='+juego['service_id']+'&brand_id='+juego['id']+'&region_id='+juego['region']['us']+'&sort=lowest_price&include_offline=1&fa='+row['children'][0]['collection_id']+'%3A'+row['children'][0]['dataset_id'];
					url_precio = url; 
				}
			} 
		}); 
		
		if(game["name"] == 'wow_tbc')
		{
			const aliancePrice = await scraping(url_aliance,game["name"]);
			const hordePrice = await scraping(url_horde,game["name"]);
			
			return {aliance:aliancePrice, horde:hordePrice}
		}
		
		if(game["name"] == 'wow_som')
		{
			const aliancePrice = await scraping(url_aliance,game["name"]);
			const hordePrice = await scraping(url_horde,game["name"]);
			
			return {aliance:aliancePrice, horde:hordePrice}
		}
		
		if(game["name"] == 'new_world')
		{ 
			const price = await scraping(url_precio,game["name"]);
			return {price:price}
		}
		
		if(game["name"] == 'old_runescape')
		{ 
			const price = await scraping(url_precio,game["name"]);
			return {price:price}
		}
		
		if(game["name"] == 'runescape3')
		{ 
			const price = await scraping(url_precio,game["name"]);
			return {price:price}
		}
		
		if(game["name"] == 'albion_online')
		{ 
			const price = await scraping(url_precio,game["name"]);
			return {price:price}
		}
		
		if(game["name"] == 'lost_ark')
		{ 
			const price = await scraping(url_precio,game["name"]);
			return {price:price}
		}
	}  
}

module.exports = get_json_games