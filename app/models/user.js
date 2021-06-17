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

//Exporting schema
module.exports = mongoose.model(userSchema);