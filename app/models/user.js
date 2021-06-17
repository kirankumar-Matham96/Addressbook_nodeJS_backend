/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Have the schema for registration and login user.
 *
 * @description
 *
 * @file        : models/user.js
 * @overview    : Provides schema for database and performs registering user and authorizing
 * @module      : this is necessary to provide authorization to a new user to use CRUD operations
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
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      validate: /^[A-Z]{1}[A-Za-z]{2,30}/,
    },
    lastName: {
      type: String,
      require: true,
      validate: /^[A-Z]{1}[A-Za-z]{2,30}/,
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
  },
  {
    timestamps: true,
    versionKey:false
  }
)

/**
 * function to make hashed password.
 */
 userSchema.pre('save', function (next) {
  // const employee = this;
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
userSchema.methods.comparePasswords = (clientsPassword, callback) => {
  bcrypt.compare(clientsPassword, this.password, (err, matched) => {
    return err ? callback(err, null) : callback(null, matched);
  });
};

//Assigning schema to a variable
const schema = mongoose.model('userSchemaModel',userSchema);

//ES6-feature: class
class RegisterUser{
  //Register new user
  newUserRegistration = (newUser, callback) => {
    try {
      const user = new userDataModel({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      });

      //to save the new data
      user.save({}, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      return callback(err, null);
    }
  };

  //To login
  loginUser(clientCredentials, callback) {
    schema.findOne({ email: clientCredentials.email }, (err, data) => {
      if (err) return callback(err, null);
      else if (!data) return callback('User not found with email', null);
      return callback(null, data);
    });
  }
}

//Exporting schema
module.exports = mongoose.model('userSchemaModel',userSchema);

//Exporting instance of the class
module.exports = new RegisterUser();