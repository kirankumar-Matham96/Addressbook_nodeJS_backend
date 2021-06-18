/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : To contain express routes
 *
 * @description
 *
 * @file        : routes/addressBook.js
 * @overview    : Contains all the express routes
 * @module      : this is necessary to use HTTP methods
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 17-06-2021
 *********************************************************************/

 'use strict';

 //Importing controller modules
 const userController = require('../controllers/user');
 
 /**
  * @description: Contains function with required routes
  *               that invoke callback functions when client requested.
  * @param {instance} app (an instance of express)
  */
 module.exports = (app) => {
   
   //To register a new user
   app.post('/registerUser', userController.registerUser);
   
   //To login
   app.post('/userLogin', userController.loginUser);
 };
 