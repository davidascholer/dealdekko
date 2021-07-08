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
route.get('/daily',render_services.daily);
route.get('/category',render_services.category);
//side views
route.get('/search',render_services.search);
route.get('/about',render_services.about);
route.get('/cookie-policy',render_services.cookie);
route.get('/privacy-info',render_services.privacy);
route.get('/contact',render_services.contact);

//The 404 Route 
route.get('*', render_services.error);

//post requests
route.put('/api/:name/:id',api_services.put);

module.exports = route;