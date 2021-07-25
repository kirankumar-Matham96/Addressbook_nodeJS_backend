/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Have the schema for CRUD operations.
 *
 * @description
 *
 * @file        : models/user.js
 * @overview    : Provides schema for database and performs CRUD operations
 * @module      : this is necessary to provide performs CRUD options
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 17-06-2021
 *********************************************************************/

 'use strict'

 //Importing mongoose
 const mongoose = require('mongoose');

 //Importing bcrypt
 const bcrypt = require('bcrypt');

 //salt rounds to provide salt for hashing
 const SALT_ROUNDS = 10;

 //Address Book mongoose schema
const addressBookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      validate: /^[A-Z]{1}[\\sA-Za-z]{2,30}/,
    },
    email: {
      type: String,
      require: true,
      validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      validate: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    },
    address: {
      type: String
    },
    street: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: Number
    },
    phoneNumber: {
      type: String,
      require: true
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

/**
 * function to make hashed password.
 */
 addressBookSchema.pre('save', function (next) {
  const user = this;

 //generating salt and adding to hashed password, then replacing password with hash
 bcrypt.hash(user.password, SALT_ROUNDS, (err, hashedPassword) => {
   if (err) return next(err);

   //assigning hashed password to the object
   user.password = hashedPassword;

   //re-routing to the next middleware
   next();
 });
 });

 //comparing passwords for the authentication
 addressBookSchema.methods.comparePasswords = (clientsPassword, callback) => {
  bcrypt.compare(clientsPassword, this.password, (err, matched) => {
    return err ? callback(err, null) : callback(null, matched);
  });
};

//assigning schema to a constant
const schema = mongoose.model(
  'addressBookSchema',
  addressBookSchema
);

// Exporting schema as a module, so that we can directly access the data inside structure.
module.exports = mongoose.model('addressBookSchema', addressBookSchema);

class CRUDOperations {
  //create method
  createContact = (newContact, callback) => {
    try {
      const contact = new schema({
        name: newContact.name,
        email: newContact.email,
        password: newContact.password,
        address: newContact.address,
        street: newContact.street,
        city: newContact.city,
        state: newContact.state,
        zip: newContact.zip,
        phoneNumber: newContact.phoneNumber,
      });

      //to save the new data
      contact.save({}, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //Get all the data from the server
  findAll = (callback) => {
    try {
      schema.find({}, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //get one employee by id
  getDataById = (contactId, callback) => {
    try {
      schema.findById(contactId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //update with id
  updateContactById = (contactId, contactData, callback) => {
    try {
      schema.findByIdAndUpdate(
        contactId.contactId,
        {
          name: contactData.name,
          email: contactData.email,
          password: contactData.password,
          address: contactData.address,
          phoneNumber: contactData.phoneNumber,
        },
        { new: true },
        (err, data) => {
          return err ? callback(err, null) : callback(null, data);
        }
      );
    } catch (err) {
      callback(err, null);
    }
  };

  //Removing employee with id
  removeContactById = (contactId, callback) => {
    try {
      schema.findByIdAndRemove(contactId.contactId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };
}

//exporting class
module.exports = new CRUDOperations();