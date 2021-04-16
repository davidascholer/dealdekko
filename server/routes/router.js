const express = require('express');
const route = express.Router();

const render_services = require('../services/render');
const api_services = require('../services/api');
// const controller = require('../controller/controller');

/**
 * @description Root Route
 * @method GET /
 */
//main views
route.get('/',render_services.homeRoutes);
route.get('/category',render_services.category);
//side views
route.get('/search',render_services.search);
route.get('/about',render_services.about);
route.get('/cookie-policy',render_services.cookie);
route.get('/privacy-info',render_services.privacy);
route.get('/contact',render_services.contact);
//post requests
route.put('/api/:name/:id',api_services.put);
// /**
//  * @description add users
//  * @method GET /add-user
//  */
// route.get('/add-user',services.add_user);
// /**
//  * @description update user
//  * @method GET /update-user
//  */
// route.get('/update-user',services.update_user);

// //API
// route.post('/api/users',controller.create);
// route.get('/api/users',controller.find);
// //Currently not working locally
// route.put('/api/users/:id',controller.update);
// //Currently not working locally
// route.delete('/api/users/:id',controller.delete);

module.exports = route;