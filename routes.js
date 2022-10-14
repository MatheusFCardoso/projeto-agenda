const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController') 
const loginController = require('./src/controllers/loginController')
const registerController = require('./src/controllers/registerController.js')



// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login' , loginController.index)
route.post('/login' , loginController.login) 
route.get('/logout' , loginController.logout ) 

// Rotas de cadastro 
route.get('/cadastrar' , registerController.index )
route.post('/cadastrar' , registerController.postIndex )

module.exports = route;