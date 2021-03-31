//axios makes it easier to make a request in an express application
const axios = require('axios');

//we need to set the origin of the url to direct the files
const origin = "https://test-database-managment.herokuapp.com";

exports.homeRoutes=(req,res)=>{

    // res.render('index');
    // res.render('index',{users:"New Data"});

    // Make a get request to /api/users
    axios.get(origin+'/api/users')
    .then(function(response){
        res.render('index',{users:response.data});
    }).catch(err=>{
        res.send(err);
    })

}

exports.add_user=(req,res)=>{
    res.render('add_user');
}

exports.update_user=(req,res)=>{
    console.log('works here');

    // res.render('update_user');
    axios.get(origin+'/api/users',{params: {id : req.query.id}})
    .then(function(userdata){
        res.render('update_user',{user : userdata.data});
    }).catch(err=>{
        res.send(err);
    })
}