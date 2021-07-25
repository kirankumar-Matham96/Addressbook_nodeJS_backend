/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm employeePayroll.js
 *                2. If nodemon installed    cmd> npm test
 *
 * Purpose      : To test the functions
 *
 * @description : tests all the pass and fail cases
 *
 * @file        : test/addressBook.js
 * @overview    : tests the HTTP methods with different possibilities
 * @module      : this is necessary to make sure the program works properly
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 17-06-2021
 *********************************************************************/

//Importing needed modules and dependencies
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server');
const userInput = require('./addressBookData.json');
const mocha = require('mocha');
const { getMaxListeners } = require('process');
const should = chai.should();

//using chaiHTTP
chai.use(chaiHTTP);

/**
 * @description Test case for registering new user.
 *              Contains both positive and negative cases.
 */
describe('POST - User Registration', () => {
  // after('givenData_whenValid_shouldRegisterTheUser', (done) => {
  //   const userDetails = userInput.registerUserPass;
  //   chai
  //     .request(server)
  //     .post('/registerUser')
  //     .send(userDetails)
  //     .end((err, res) => {
  //       res.should.have.status(201);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('success').eql(true);
  //       res.body.should.have
  //         .property('message')
  //         .eql('User registered successfully');
  //       res.body.should.have.property('data').which.is.an('object');
  //       err ? done(err) : done();
  //     });
  // });

  it('givenUserData_whenFirstNameIsInValid_shouldReturnError', (done) => {
    const userDetails = userInput.registerUserFirstNameFail1;
    chai
      .request(server)
      .post('/registerUser')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have
          .property('message')
          .eql(
            `"firstName" with value "${userDetails.firstName}" fails to match the required pattern: /^[A-Z]{1}[A-Za-z]{2,30}/` ||
              'Some error occurred while adding user'
          );
        res.body.should.have.property('data').should.be.a('object');
        err ? done(err) : done();
      });
  });

  it('givenUserData_whenLastNameIsInValid_shouldReturnError', (done) => {
    const userDetails = userInput.registerUserLastNameFail2;
    chai
      .request(server)
      .post('/registerUser')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have
          .property('message')
          .eql(
            `"lastName" with value "${userDetails.lastName}" fails to match the required pattern: /^[A-Z]{1}[A-Za-z]{2,30}/` ||
            'Some error occurred while adding user'
          );
        res.body.should.have.property('data').should.be.a('object');
        err ? done(err) : done();
      });
  });

  it('givenUserData_whenEmailIsInValid_shouldReturnError', (done) => {
    const userDetails = userInput.registerUserEmailFail;
    chai
      .request(server)
      .post('/registerUser')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have
          .property('message')
          .eql(
            `"email" with value "${userDetails.email}" fails to match the required pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/`
          );
        res.body.should.have.property('data').should.be.a('object');
        err ? done(err) : done();
      });
  });
});

/**
 * @description: User Login test cases.
 *               Contains positive and negative scenarios.
 */
describe('POST - User Login', () => {
  it('givenUserLoginDetails_whenEmailAndPasswordAreValid_shouldLoginTheUserAndReturnToken', (done) => {
    const userCredentials = userInput.userLoginPass;
    chai
      .request(server)
      .post('/userLogin')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Login successful👍');
        res.body.should.have.property('data');
        err ? done(err) : done();
      });
  });

  it('givenUserLoginDetails_whenInValidEmailAndValidPassword_shouldReturnError', (done) => {
    const userCredentials = userInput.userLoginWrongEmailFail;
    chai
      .request(server)
      .post('/userLogin')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have
          .property('message')
          .eql('User not found with email');
        err ? done(err) : done();
      });
  });

  it('givenDetails_whenValidEmailAndInValidPassword_shouldReturnError', (done) => {
    const userCredentials = userInput.userLoginWrongPasswordFail;
    chai
      .request(server)
      .post('/userLogin')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Wrong password!❌');
        err ? done(err) : done();
      });
  });
});

// //method to execute before every test case further
describe('Address Book API', () => {
  let token = '';

  beforeEach((done) => {
    const userData = userInput.userLoginPass;
    chai
      .request(server)
      .post('/userLogin')
      .send(userData)
      .end((err, res) => {
        token = res.body.data;
        res.should.have.status(200);
        if (err) return done(err);
        done();
      });
  });

  /**
   * @description: Test cases for creating new contact object with POST.
   *               Contains positive and negative cases.
   */
  describe('POST - Add New Contact', () => {
    // after('givenUserDetails_whenValid_shouldAddNewContactToTheDatabase', (done) => {
    //   const ContactDetails = userInput.addContactPass;
    //   chai
    //     .request(server)
    //     .post('/addressBook/addContact')
    //     .send(ContactDetails)
    //     .set('token', token)
    //     .end((err, res) => {
    //       res.should.have.status(201);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('success').eql(true);
    //       res.body.should.have
    //         .property('message')
    //         .eql('Contact added successfully');
    //       res.body.should.have.property('data').should.be.a('object');
    //       if (err) {
    //         return done(err);
    //       }
    //       done();
    //     });
    // });

    it('givenUserDetails_whenNameIsInWrongFormat_shouldReturnError', (done) => {
      const contactDetails = userInput.addContactInvalidNameFormat1;
      chai
        .request(server)
        .post('/addressBook/addContact')
        .send(contactDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(
              // eslint-disable-next-line no-useless-escape
              `\"name\" with value \"${contactDetails.name}\" fails to match the required pattern: /^[A-Z]{1}[\\sA-Za-z]{2,30}/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenNameIsLessThanThreeChars_shouldReturnError', (done) => {
      const contactDetails = userInput.addContactInvalidNameFormat2;
      chai
        .request(server)
        .post('/addressBook/addContact')
        .send(contactDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql('"name" length must be at least 3 characters long');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenEmailIsInWrongFormat_shouldReturnError', (done) => {
      const contactDetails = userInput.addContactInvalidEmailFormat;
      chai
        .request(server)
        .post('/addressBook/addContact')
        .send(contactDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(
              `"email" with value "${contactDetails.email}" fails to match the required pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenPasswordDoesNotContainUpperCaseChar_shouldReturnError', (done) => {
      const contactDetails = userInput.addContactInvalidPasswordFormat1;
      chai
        .request(server)
        .post('/addressBook/addContact')
        .send(contactDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(
              `"password" with value "${contactDetails.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenPasswordDoesNotContainNumber_shouldReturnError', (done) => {
      const ContactDetails = userInput.addContactInvalidPasswordFormat3;
      chai
        .request(server)
        .post('/addressBook/addContact')
        .send(ContactDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(
              `"password" with value "${ContactDetails.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenPasswordDoesNotContainLoweCaseChar_shouldReturnError', (done) => {
      const contactDetails = userInput.addContactInvalidPasswordFormat4;
      chai
        .request(server)
        .post('/addressBook/addContact')
        .send(contactDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(
              `"password" with value "${contactDetails.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenPasswordDoesNotContainSpecialChar_shouldReturnError', (done) => {
      const contactDetails = userInput.addContactInvalidPasswordFormat2;
      chai
        .request(server)
        .post('/addressBook/addContact')
        .send(contactDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(
              `"password" with value "${contactDetails.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * @description Test cases for retrieving all the employees with GET.
   *              Contains positive and negative cases.
   */
  describe('GET - Retrieves All Data', () => {
    it('givenValidRequest_shouldGetAllTheContactsData', (done) => {
      chai
        .request(server)
        .get('/addressBook')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('Successfully retrieved the contacts data');
          res.body.should.have.property('data').which.is.an('array');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenToken_whenTokenIsInValid_shouldReturnError', (done) => {
      chai
        .request(server)
        .get('/addressBook')
        .set('token', token + 1)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('invalid signature');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * @description Test cases for retrieving the employee by id with GET.
   *              Contains positive and negative cases.
   */
  describe('GET - Retrieve Contact With ID', () => {
    it('given_ValidTokenAndID_shouldReturnContactData', (done) => {
      chai
        .request(server)
        .get(`/addressBook/getContact/${userInput.withIdPass.id}`)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('Contact retrieved successfully');
          res.body.should.have.property('data').which.is.an('object');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenTokenAndId_InValidTokenAndValidID_shouldReturnError', (done) => {
      chai
        .request(server)
        .get(`/addressBook/getContact/${userInput.withIdPass.id}`)
        .set('token', token+1)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('invalid signature');
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it('givenTokenAndId_validTokenAndInValidID_shouldReturnError', (done) => {
      chai
        .request(server)
        .get(`/addressBook/getContact/${userInput.withIdFail.id}`)
        .set('token', token)
        .end((error, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Contact not found!🤷🏻‍♀️');
          if (error) {
            return done(error);
          }
          done();
        });
    });
  });

  /**
   * @description Test cases for updating the employees by id with PUT.
   *              Contains positive and negative cases.
   */
  describe('PUT - Update Contact Data', () => {
    it('givenUserData_whenValid_shouldUpdateContactDataSuccessfully', (done) => {
      chai
        .request(server)
        .put(`/addressBook/updateContact/${userInput.withIdPass.id}`)
        .send(userInput.updateContactPass)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('Details updated for the contact successfully');
          res.body.should.have.property('data').should.be.a('object');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenData_whenNameFormatIsInValid_shouldReturnError', (done) => {
      chai
        .request(server)
        .put(`/addressBook/updateContact/${userInput.withIdPass.id}`)
        .send(userInput.addContactInvalidNameFormat1)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql(
              `"name" with value "${userInput.addContactInvalidNameFormat1.name}" fails to match the required pattern: /^[A-Z]{1}[\\sA-Za-z]{2,30}/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenData_whenEmailIsInValid_shouldReturnError', (done) => {
      chai
        .request(server)
        .put(`/addressBook/updateContact/${userInput.withIdPass.id}`)
        .send(userInput.addContactInvalidEmailFormat)
        .set('token', token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql(
              // eslint-disable-next-line no-useless-escape
              `"email" with value "${userInput.addContactInvalidEmailFormat.email}" fails to match the required pattern: /^[a-zA-Z0-9.!#$%&\'*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/`
            );
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it('givenData_whenPasswordIsInValid_shouldReturnError', (done) => {
      chai
        .request(server)
        .put(`/addressBook/updateContact/${userInput.withIdPass.id}`)
        .send(userInput.addContactInvalidPasswordFormat3)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql(
              `"password" with value "${userInput.addContactInvalidPasswordFormat3.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * @description Test cases for deleting the employee by id with DELETE.
   *              Contains positive and negative cases.
   */
  describe('DELETE - Removes Contact', () => {
    // it('givenValidIDAndToken_shouldDeleteContactDataSuccessfully', (done) => {
    //   chai
    //     .request(server)
    //     .delete(`/addressBook/deleteContact/${userInput.withIdPass.id}`)
    //     .set('token', token)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('success').eql(true);
    //       res.body.should.have
    //         .property('message')
    //         .eql('Contact deleted successfully');
    //       if (err) {
    //         return done(err);
    //       }
    //       done();
    //     });
    // });

    it('givenData_whenIdIsInValid_shouldReturnErrorMessage', (done) => {
      chai
        .request(server)
        .delete(`/addressBook/deleteContact/${userInput.withIdFail.id}`)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql('Contact not found!🤷🏻‍♂️');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
