/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : To authenticate and authorize user
 *
 * @description
 *
 * @file        : middleware/helper.js
 * @overview    : helps to validate password, generates token and validates token
 * @module      : this is necessary to access the data in the database.
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 17-06-2021
 *********************************************************************/

 'use strict';

 //importing .env file
 require('dotenv').config();

 //importing bcrypt module
 const bcrypt = require('bcrypt');

 //importing jsonwebtoken module
 const JWT = require('jsonwebtoken');

 //ES-6 feature: class
 class bcryptHelper {
   /**
    * @description : Generates token
    * @param {object} userData data from the client
    * @returns token
    */
   accessTokenGenerator(userData) {
     return JWT.sign(userData, process.env.SECRET_CODE, {
       expiresIn: '1000000s',
     });
   }

   /**
    * @description: Method to compare given password and actual password
    *               stored in the database.
    * @param {*} clientPassword password string provided by the user/client
    * @param {*} dbSavedPassword salted and hashed password stored in the database
    * @returns boolean
    */
   passwordCheckWithBCrypt(clientPassword, dbSavedPassword) {
     return clientPassword && dbSavedPassword
       ? bcrypt.compareSync(clientPassword, dbSavedPassword)
       : false;
   }

   /**
    * To authenticate token
    * @param {*} req (express property)
    * @param {*} res (express property)
    * @param {*} next (express property)
    * @returns HTTP status and object
    */
   checkJWToken(req, res, next) {
     const token = req.get('token');

     if (token) {
       JWT.verify(token, process.env.SECRET_ACCESS_TOKEN, (err) => {
         if (err) {
           console.log('Error: ', err);
           return res.status(400).send({
             success: false,
             message: err.message || 'Invalid token!',
           });
         } else {
           next();
         }
       });
     } else {
       return res.status(401).send({
         success: false,
         message: 'User is not authorized until token is provided!',
       });
     }
   }
 }

 //exporting module
 module.exports = new bcryptHelper();
