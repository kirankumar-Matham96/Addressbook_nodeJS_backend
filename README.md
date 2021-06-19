# Addressbook_nodeJS_backend

 -> This backend application is used to perform CRUD operations at server side.
 -> Implemented using NodeJS-ExpressJS-MongoDB.
 -> Have the features of validating user input, 
	encrypts the passwordand generates JWT for the security and
	authenticate user and autherize before accessing database.

---
## Requirements

	For development, you will need Visual Studio Code(VSCODE), Node.js and a node global package, npm,
	installed in your environement.
	
	Also need: 
	
		-> ExpressJS: to build the API and utilise HTTP methods.
		-> MongooseJS: to connect to the database and build schema.
		-> winston: to log the data to files/database.
		-> @hapi/joi: to validate the user input.
		-> bcrypt: to encrypt the password.
		-> jsonwebtoken: to parse the information seccurely without violating the data.
		-> dotenv: to avoid including sensitive data to the project.
		-> nodemon: to restart the server when ever the chages happen in the program.
	
	If you want to perform tests:
	
		-> mocha: test runner. (you can choose any other test runner.)
		-> chai: library for the assertion methods.
		-> istambul/nyc: for code coverage.
		
	Incase, if npm cache propblems occurs:
		-> ws: to solve some of the cache problems.(If not solved, please remove and re-install all the node modules.)

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
## Configure app

Open `a/nice/path/to/a.file` then edit it with your settings. You will need:

- URL for the mongodb;
- Port number to run the server;
- Secret code for JWT;

## Running the project

    $ npm start
	
## To run the test cases

    $ npm test
