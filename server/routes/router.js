const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 * @description Root Route
 * @method GET /
 */
route.get('/',services.homeRoutes);
/**
 * @description add users
 * @method GET /add-user
 */
route.get('/add-user',services.add_user);
/**
 * @description update user
 * @method GET /update-user
 */
route.get('/update-user',services.update_user);

//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
//Currently not working locally
route.put('/api/user/:id',controller.update);
//Currently not working locally
route.delete('/api/user/:id',controller.delete);

module.exports = route;