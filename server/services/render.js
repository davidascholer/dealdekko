const control = require('./../controller/controller');

exports.homeRoutes = (req, res) => {
    control.grabDbData().then(data => {

        res.render('index', { dealData: data });
    })
};

exports.category = (req, res) => {
    control.parseCategoryData(req.query.cat).then(data => {

        res.render('categories' , { category: data[0],dealData: data[1] });
    })
};
exports.search = (req, res) => {
    control.parseSearchData(req.query.searchString).then(data => {

        res.render('search' , { search: data[0],dealData: data[1] });
    })
};

exports.about = (req, res) => {
        res.render('about');
};
exports.cookie = (req, res) => {
        res.render('cookie-policy');
};
exports.privacy = (req, res) => {
        res.render('privacy-info');
};
exports.contact = (req, res) => {
        res.render('contact');
};

