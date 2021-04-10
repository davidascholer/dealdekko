const express = require('express');
const route = express.Router();

const services = require('../services/render');
// const controller = require('../controller/controller');

/**
 * @description Root Route
 * @method GET /
 */
route.get('/',services.homeRoutes);
route.get('/category',services.category);
route.get('/search',services.search);
route.get('/about',services.about);
route.get('/cookie-policy',services.cookie);
route.get('/privacy-info',services.privacy);
route.get('/contact',services.contact);
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