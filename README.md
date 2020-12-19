# Backend API

## Live Demo
https://backend-api23.herokuapp.com/

## How to use
Make sure you have Node.js and the npm installed
```
$ git clone https://github.com/Dimasss11/backendAPI.git
$ cd backendAPI
$ npm install
$ npm start
```
And point your browser to http://localhost:3000

## Configuration
Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME = VALUE. For example

```
ACCESS_TOKEN_SECRET='key'
DB_HOST='127.0.0.1'
DB_USER='root'
DB_NAME='store_db'
DB_PASS=''
```
You're gonna need to create a DB named 'store_db' and import store_db.sql from the folder 'sql' or open store_db.mwb and synchronize model with database 
