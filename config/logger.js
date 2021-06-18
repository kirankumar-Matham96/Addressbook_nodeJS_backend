/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : To log the information and errors to the log file
 *
 * @description
 *
 * @file        : config/logger.js
 * @overview    : Inserts the required info/error to the log file
 * @module      : this is necessary to debug and resolve the problems
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 17-06-2021
 *********************************************************************/

 'use strict';

 //Importing functions from winston
 const { createLogger, transports, format } = require('winston');

 //Creating logger object
 const logger = createLogger({
   transports: [
     //to print/send info to the file
     new transports.File({
       filename: './log files/info.log',
       level: 'info',
       format: format.combine(format.timestamp(), format.json()),
     }),

     //to print/send errors to the file
     new transports.File({
       filename: './log files/error.log',
       level: 'error',
       format: format.combine(format.timestamp(), format.json()),
     }),
   ],

   //setting winston to not exit on error
   exitOnError: false,
 });

 //exporting the logger
 module.exports = logger;
