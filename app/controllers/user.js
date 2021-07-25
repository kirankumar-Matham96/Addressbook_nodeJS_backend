/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Controls the operations of registration and login
 *
 * @description
 *
 * @file        : controllers/user.js
 * @overview    : controls user registration and login tasks
 * @module      : this is necessary to register new user and give authorization.
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 17-06-2021
 *********************************************************************/

 'use strict';

 // Importing module from service.js
 const service = require('../service/user.js');

 //Importing middle ware to validate schema (joi validator)
 const { validateInput } = require('../middleware/userValidation.js');

 //ES6-feature: class
 class UserController {
   /**
    * function to call the create function from service.js (adds new user)
    * @param {*} req (express property)
    * @param {*} res (express property)
    * @returns HTTP status and object
    */
   registerUser = (req, res) => {
     try {
       //validation
       const userInputValidation = validateInput.validate(req.body);
       if (userInputValidation.error) {
         return res.status(400).send({
           success: false,
           message: userInputValidation.error.details[0].message,
           data: req.body,
         });
       }

       //Object for the new user data
       const newUser = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         password: req.body.password,
       };

       //calling method to add new user data
       service.registerNewUser(newUser, (err, data) => {
         return err
           ? res.status(500).send({
               success: false,
               message:
                 err.message || 'Some error occurred while adding user',
             })
           : res.status(201).send({
               success: true,
               message: 'User registered successfully',
               data: data,
             });
       });
     } catch (err) {
       return res.status(500).send({
         success: false,
         message: err.message || 'Some error occurred!🎈',
       });
     }
   };

   /**
    * To login the user and authenticate
    * @param {*} req (express property)
    * @param {*} res (express property)
    */
   loginUser = (req, res) => {
     const userCredentials = {
       email: req.body.email,
       password: req.body.password,
     };

     //calling a function to login user
     service.userLogin(userCredentials, (err, data) => {
       return err
         ? res.status(400).send({ success: false, message: err })
         : res
             .status(200)
             .send({ success: true, message: 'Login successful👍', data: data });
     });
   }
 }

 //exporting the class
 module.exports = new UserController();
