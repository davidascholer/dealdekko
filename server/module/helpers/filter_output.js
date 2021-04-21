const filterData = data => {
    for (let d in data) {
        if (data[d]) {
            const vendor = data[d].vendor;
            const title = data[d].title;
            const details = data[d].details;
            const price = data[d].price;
            if (vendor === 'slickdeals.net')
                delete data[d];
            else if (title.includes('slickdeals') || title.includes(' SD ')||title==='undefined'||title===undefined)
                delete data[d];
            else if (details.includes('slickdeals') || details.includes('thanks'))
                delete data[d];
            else if (price===undefined||price.includes('undefined'))
                delete data[d];
        }
    }
    return data;
}