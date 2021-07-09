const filterData = data => {
    for (let d in data) {
        if (data[d]) {
            if (data[d].vendor === 'slickdeals.net'){
                delete data[d];
                continue;
            }
            else if (data[d].title === 'undefined' || data[d].title === undefined || data[d].title.toLowerCase().includes('slickdeals') || data[d].title.toLowerCase().includes(' SD ')){
                delete data[d];
                continue;
            }
            else if (data[d].details.includes('slickdeals') || data[d].details.includes('thanks')){
                delete data[d];
                continue;
            }
            else if (data[d].price === undefined || data[d].price.includes('undefined')){
                delete data[d];
                continue;
            }
            // else if (data[d].flag == 1) {
            //     delete data[d];
            //     continue;
            // }
            else if (data[d].affiliate_url == null || data[d].affiliate_url == undefined || !data[d].affiliate_url.includes(data[d].vendor)) {
                delete data[d];
                continue;
            }
            
            if (data[d].vendor === 'amazon.com') {
                data[d].details = amazon(data[d].details);
            }
            else if (data[d].vendor === 'ebay.com') {
                data[d].details = ebay(data[d].details);
            }
            else if (data[d].vendor === 'gamestop.com') {
                data[d].details = gamestop(data[d].details);
            }
        }
    }
    return data;
}

const amazon = returnDetails => {

    returnDetails += `<br><br><br>Don't have Amazon Prime? Students can get a free 6-Month <a target="_blank"
        href='https://www.amazon.com/amazonprime?_encoding=UTF8&ascsubtag=203d87729db911eb990886ac4273965d0INT&planOptimizationId=WLPStudentMonthlyEligiblePlans&tag=vamplitude-20'>Amazon Prime</a > trial with free 2 - day shipping, unlimited video streaming & more.<br><br>Otherwise, there's also a free 1-Month <a href = 'https://www.amazon.com/amazonprime?_encoding=UTF8&tag=vamplitude-20'>Amazon Prime</a> trial available.`;

    return returnDetails;
}
const ebay = returnDetails => {

    returnDetails += `<br><br><br>Not the deal you're looking for? Ebay has a sale for <a target="_blank"
        href='https://www.ebay.com/e/_electronics/direct-brands-certified-refurbished?mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338802310&toolid=20014&customid=&mkevt=1'>up to 50% off from name brand items</a > until June 30th.`;

    return returnDetails;
}
const gamestop = returnDetails => {

    returnDetails += `<br><br><br>Not the deal you're looking for? <a target="_blank" href='https://click.linksynergy.com/deeplink?id=NCwsJ5vO624&mid=24348&murl=https%3A%2F%2Fwww.gamestop.com%2Fdeals'>Gamestop</a> has <a target="_blank" href='https://click.linksynergy.com/deeplink?id=NCwsJ5vO624&mid=24348&murl=https%3A%2F%2Fwww.gamestop.com%2Fdeals'>daily deals</a> every day.`;

    return returnDetails;
}

module.exports.filterData = filterData;