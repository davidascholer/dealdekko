const control = require('./../controller/controller');

exports.homeRoutes = (req, res) => {
    control.grabDbData().then(data => {

        res.render('index', { dealData: data });
    })
};

exports.category = (req, res) => {
    control.parseCategoryData(req.query.cat).then(data => {
        res.render('categories' , { dealData: data });
    })
};