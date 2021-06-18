/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Starting point for the Address Book API
 *
 * @description
 *
 * @file        : server.js
 * @overview    : Set up the server, connect to database
 * @module      : This is necessary to run the Address Book API
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 17-06-2021
 *********************************************************************/

'use strict'

//Importing express
const express = require('express');

//Importing and configuring dotenv
require('dotenv').config();

const dataBaseConnection = require('./config/addressBook');

//Creating instance of express
const app = express();

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// parse request of content-type - application/json
app.use(express.json());

//connecting to database
dataBaseConnection.connectToDatabase();

//welcome message for home page
app.get('/', (req,res) => {
  res.status(200).send({success: true, message: 'Welcome to Address Book API 🙏🏻'})
})

//Calling routes
require('./app/routes/addressBook')(app)

//Adding port listener
app.listen(process.env.PORT, () => {
  console.log(`Server running at port: ${process.env.PORT}`);
})
/**TODO:
 * 1) register user bug solve
 * 2) CRUD for other operations
 * 3) logger, swagger
 * 4) Test cases
 * */