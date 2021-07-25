/** *******************************************************************
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
 ******************************************************************** */

// Importing controller modules
const userController = require('../controllers/user');
const addressBookController = require('../controllers/addressBook');

// Importing helper for validation and authentication
const helper = require('../middleware/helper');

/**
  * @description: Contains function with required routes
  *               that invoke callback functions when client requested.
  * @param {instance} app (an instance of express)
  */
module.exports = (app) => {
  // To register a new user
  app.post('/registerUser', userController.registerUser);

  // To login
  app.post('/userLogin', userController.loginUser);

  // To add contact
  app.post('/addressBook/addContact', helper.checkJWToken, addressBookController.addContact);

  // To get all the contacts
  app.get('/addressBook', helper.checkJWToken, addressBookController.getAllContacts);

  // To get contact by id
  app.get('/addressBook/getContact/:contactId', helper.checkJWToken, addressBookController.getOneContact);

  // To update contact by id
  app.put('/addressBook/updateContact/:contactId', helper.checkJWToken, addressBookController.updateContact);

  // To delete contact by id
  app.delete('/addressBook/deleteContact/:contactId', helper.checkJWToken, addressBookController.removeContact);
};
