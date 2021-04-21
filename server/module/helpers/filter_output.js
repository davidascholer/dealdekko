const filterData = data => {
    for (let d in data) {
        if (data[d]) {
            if (data[d].vendor === 'slickdeals.net'){
                delete data[d];
                continue;
            }
            else if (data[d].title.includes('slickdeals') || data[d].title.includes(' SD ') || data[d].title === 'undefined' || data[d].title === undefined){
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

            if (data[d].vendor === 'amazon.com') {
                data[d].details = amazon(data[d].details);
            }
            else if (data[d].vendor === 'ebay.com') {
                data[d].details = ebay(data[d].details);
            }
        }
    }
    return data;
}

const amazon = returnDetails => {

    returnDetails += `<br><br><br>Don't have Amazon Prime? Students can get a free 6-Month <a
        href='https://www.amazon.com/amazonprime?_encoding=UTF8&ascsubtag=203d87729db911eb990886ac4273965d0INT&planOptimizationId=WLPStudentMonthlyEligiblePlans&tag=vamplitude-20'>Amazon Prime</a > trial with free 2 - day shipping, unlimited video streaming & more.<br><br>Otherwise, there's also a free 1-Month <a href = 'https://www.amazon.com/amazonprime?_encoding=UTF8&tag=vamplitude-20'>Amazon Prime</a> trial available.`;

    return returnDetails;
}
const ebay = returnDetails => {

    returnDetails += `<br><br><br>Not the deal you're looking for? Ebay has a sale for <a
        href='https://www.ebay.com/e/_electronics/direct-brands-certified-refurbished?mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338802310&toolid=20014&customid=&mkevt=1'>up to 50% off from name brand items</a > until June 30th.`;

    return returnDetails;
}

module.exports.filterData = filterData;