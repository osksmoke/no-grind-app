const axios = require('axios');
const cheerio = require('cheerio');
const {makeUrl} = require('./makeUrl')


const scraping = async url =>{

    try {

        const pageContent = await axios.get(url);
        const $ = cheerio.load(pageContent.data);
    
        const rows = $('div#pre_checkout_sls_offer > div > .other_offer-desk-main-box')
        .map((_, el) => {
            el = $(el);
            const price = el.find('.offer-price-amount').text();
            return {price};
        }).get();
        
        const price = rows[0].price
        const result = (price * 1000) * 0.73
        
        return result.toPrecision(4)

    } catch(err) {
        return 'N/A'
    }


}

const getPrice = async server => {

    const urlAliance = makeUrl(server,'aliance')
    const urlHorde = makeUrl(server,'horde')

    const aliancePrice = await scraping(urlAliance);
    const hordePrice = await scraping(urlHorde);

    return {aliance:aliancePrice, horde:hordePrice}

}

module.exports = getPrice




