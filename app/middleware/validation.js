/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : User input data validation
 *
 * @description
 *
 * @file        : middleware/validation.js
 * @overview    : validates user input data
 * @module      : this is necessary to validate user input data
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 17-06-2021
 *********************************************************************/
 'use strict';

 //importing property/function for joi
 // eslint-disable-next-line no-unused-vars
 const { string } = require('@hapi/joi');

 //importing joi module
 const Joi = require('@hapi/joi');

 //joi validating object
 const validateInput = Joi.object({
   name: Joi.string()
     .min(3)
     .max(30)
     .pattern(new RegExp('^[A-Z]{1}[\\sA-Za-z]{2,30}'))
     .required(),
   email: Joi.string()
     .pattern(
       new RegExp(
         "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
       )
     )
     .required(),
   password: Joi.string()
     .pattern(
       new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
     )
     .required(),
   address: Joi.string(),
   street: Joi.string(),
   city: Joi.string(),
   state: Joi.string(),
   zip: Joi.number(),
   phoneNumber: Joi.string(),
 });

 //exporting module
 module.exports = { validateInput };
