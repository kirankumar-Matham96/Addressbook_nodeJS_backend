/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Controls the operations(requests and responses)
 *
 * @description
 *
 * @file        : controllers/addressBook.js
 * @overview    : controller module to control the requests
 * @module      : this is necessary to run the Address Book API
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 17-06-2021
 *********************************************************************/

 'use strict';

 // Importing module from service.js
 const service = require('../service/addressBook');

 //Importing middle ware to validate schema (joi validator)
 const { validateInput } = require('../middleware/validation');
const logger = require('../../config/logger');

 //ES6-feature: class
 class AddressBookController {
   /**
    * function to call the create function from service.js (adds new contact data)
    * @param {*} req (express property)
    * @param {*} res (express property)
    * @returns HTTP status and object
    */
   addContact = (req, res) => {
     try {
       //validation
       const userInputValidation = validateInput.validate(req.body);
       if (userInputValidation.error) {
         logger.error(userInputValidation.error.details[0].message);
         res.status(400).send({ success: false, message: error.message });
         return res.status(400).send({
           success: false,
           message: 'This email already registered!',
         });
       }

       //Object for the new employee data
       const newContact = {
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         address: req.body.address,
         phoneNumber: req.body.phoneNumber,
       };

       //calling method to add new employee data
       service.addNewContact(newContact, (err, data) => {
         if (err) {
           logger.error(err)
           return res.status(500).send({
             success: false,
             message:
               'This email is already registered!',
           })
         } else {
           return res.status(201).send({
             success: true,
             message: 'Contact added successfully',
             data: data,
           });
         }
       });
     } catch (err) {
       res.status(500).send({
         success: false,
         message: 'This email is already registered!',
       });
     }
   };

   /**
    * function to call the getAll function that gets all the data, from the service.js
    * @param {*} req (express property)
    * @param {*} res (express property)
    * @returns HTTP status and object
    */
   getAllContacts = (req, res) => {
     try {
       service.getAllContactsData((err, data) => {
         return err
           ? res.status(500).send({
               success: false,
               message: err.message || 'some error occurred',
             })
           : res.status(200).send({
               success: true,
               message: 'Successfully retrieved the contacts data',
               data: data,
             });
       });
     } catch (err) {
       res.status(500).send({
         success: false,
         message: err.message || 'Some error occurred!🎆',
       });
     }
   };

   /**
    * function to call the getOne function that gets the required employee data,
    * from the service.js
    * @param {*} req (express property)
    * @param {*} res (express property)
    * @returns HTTP status and employee object
    */
   getOneContact = (req, res) => {
     const contactId = req.params;
     try {
       //calling a function to get the employee with id
       service.getOne(contactId, (err, data) => {
         if (!data)
           return res
             .status(404)
             .send({ success: false, message: 'Contact not found!🤷🏻‍♀️' });
         return err
           ? res.status(500).send({
               success: false,
               message:
                 err.message || 'some error occurred while getting the data',
             })
           : res.status(200).send({
               success: true,
               message: 'Contact retrieved successfully',
               data: data,
             });
       });
     } catch (err) {
       res.status(500).send({
         success: false,
         message: err.message || 'Some error occurred!🧨',
       });
     }
   };

   /**
    * function to call the update function that updates the required employee data,
    * from the service.js
    * @param {*} req (express property)
    * @param {*} res (express property)
    * @returns HTTP status and object
    */
   updateContact = (req, res) => {
     try {
       //validation
       const userInputValidation = validateInput.validate(req.body);
       if (userInputValidation.error) {
         return res.status(400).send({
           success: false,
           message: userInputValidation.error.details[0].message,
         });
       }

       //id param for updating exact employee
       const contactId = req.params;

       //employee updated details from client
       const updatedDetails = {
         id: req.params.contactId,
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         address: req.body.address,
         phoneNumber: req.body.phoneNumber,
       };

       //calling method to update employee data
       service.update(contactId, updatedDetails, (err, data) => {
         return err
           ? res.status(500).send({
               success: false,
               message:
                 err.message || 'some error occurred while updating the details',
             })
           : res.status(200).send({
               success: true,
               message: `Details updated for the contact successfully`,
               data: data,
             });
       });
     } catch (err) {
       res.status(500).send({
         success: false,
         message: err.message || 'Some error occurred!🎎',
       });
     }
   };

   /**
    * @description: function to call the update function that updates the required employee data,
    *               from the service.js
    * @param {*} req (express property)
    * @param {*} res (express property)
    * @returns HTTP status and object
    */
  //  patchContact = (req, res) => {
  //   try {
  //     //validation
  //     const userInputValidation = validateInput.validate(req.body);
  //     if (userInputValidation.error) {
  //       return res.status(400).send({
  //         success: false,
  //         message: userInputValidation.error.details[0].message,
  //       });
  //     }

  //     //id param for updating exact employee
  //     const contactId = req.params;

  //     //calling method to update employee data
  //     service.patching(contactId, req.body, (err, data) => {
  //       return err
  //         ? res.status(500).send({
  //             success: false,
  //             message:
  //               err.message || 'some error occurred while updating the details',
  //           })
  //         : res.status(200).send({
  //             success: true,
  //             message: `Details updated for the contact successfully 🎉`,
  //             data: data,
  //           });
  //     });
  //   } catch (err) {
  //     res.status(500).send({
  //       success: false,
  //       message: err.message || 'Some error occurred!🎎',
  //     });
  //   }
  // };

   /**
    * function to call the remove function that deletes the required employee data,
    * from the service.js
    * @param {*} req (express property)
    * @param {*} res (express property)
    * @returns HTTP status and object
    */
   removeContact = (req, res) => {
     //id param for updating exact employee
     const contactId = req.params;

     try {
       //calling method to delete employee data
       service.remove(contactId, (err, data) => {
         return err
           ? res
               .status(500)
               .send({ success: false, message: 'Some error occurred🤷🏻‍♂️!' })
           : res.status(200).send({
               success: true,
               message: 'Contact deleted successfully',
             });
       });
     } catch (err) {
       res
         .status(500)
         .send({ message: err.message || 'Some error occurred!🎊' });
     }
   };
 }

 //exporting the class
 module.exports = new AddressBookController();
