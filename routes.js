const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController') 
const loginController = require('./src/controllers/loginController')
const registerController = require('./src/controllers/registerController.js')
const contactsController = require('./src/controllers/contactsController.js')

const { loginRequired } = require('./src/middlewares/middleware')


// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login' , loginController.index)
route.post('/login' , loginController.login) 
route.get('/logout' , loginController.logout ) 

// Rotas de cadastro 
route.get('/cadastrar' , registerController.index )
route.post('/cadastrar' , registerController.postIndex )

// Rotas de contatos
route.get('/contato' , loginRequired , contactsController.index )
route.post('/contato' , loginRequired , contactsController.postIndex )
route.get('/contato/edit/:id' , loginRequired , contactsController.edit )
route.post('/contato/edit/:id' , loginRequired , contactsController.postEdit )
route.get('/contato/delete/:id' , loginRequired , contactsController.delete )

module.exports = route;