/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Invokes the functions related to the database
 *
 * @description
 *
 * @file        : service/addressBook.js
 * @overview    : calls functions from the model to respond to the controller
 * @module      : this is necessary to perform CRUD operations
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 17-06-2021
 *********************************************************************/

 'use strict';

 // Importing the database structure or model
 const addressBookSchema = require('../models/addressBook');

 //Importing helper class
 const helper = require('../middleware/helper');

 //ES-6 feature: class
class ServiceMethods {
  /**
   * creates a contact object with the request of a client
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns callback
   */
  addNewContact = (newContact, callback) => {
    try {
      //calling the method to create new employee object with given data
      addressBookSchema.createContact(newContact, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err || 'Some error occurred!', null);
    }
  };

  /**
   * Gets all the employees data
   * @param {*} callback callback function
   */
   getAllContactsData = (callback) => {
    try {
      //calling method to get all the employees
      addressBookSchema.findAll((err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      return callback(err, null);
     };
  };

  /**
   * @description: get the employee with provided ID
   * @param {*} contactId path to the employee object
   * @param {*} callback callback function
   * @returns callback, status, object
   */
  getOne = (contactId, callback) => {
    try {
      if (!contactId.contactId) {
        return res
          .status(404)
          .send({ message: `Contact with id: ${contactId._id} not found` });
      }

      //calling method to get employee data with id
      addressBookSchema.getDataById(contactId.contactId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  /**
   * Updating employee data
   * @param {*} contactId id object
   * @param {*} contactData data object
   * @param {*} callback function
   */
  update = (contactId, contactData, callback) => {
    try {
      if (!contactId.contactId) {
        return res
          .status(404)
          .send({ message: `Contact with id: ${contactId.contactId} not found` });
      }

      //calling method to update employee
      addressBookSchema.updateContactById(contactId, contactData, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  /**
   * deletes the data with id
   * @param {*} contactId path to the object
   * @param {*} callback callback function
   * @returns
   */
  remove = (contactId, callback) => {
    try {
      if (!contactId.contactId) {
        return res
          .status(404)
          .send({ message: `Contact with id: ${contactId.contactId} not found` });
      }

      //calling method to delete employee
      addressBookSchema.removeContactById(contactId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };
}

 //exporting class
 module.exports = new ServiceMethods();
