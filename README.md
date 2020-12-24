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

## API endpoints

### Login user
#### POST http://localhost:3000/api/login OR https://backend-api23.herokuapp.com/api/login 
Request:
```
Body:
{
  "email": "email@example.com", 
  "password": "qwerty"
}
```
Responses:
```
200, OK
Body:
{
  "token": "eyJhbGciOiJIUNiJ9.Mw.oAxY8cg69l1gnfVkl8VU5LcJhT3pQbwLDUx5A"
}

422, Unprocessable Entity
Body: 
[{
  "field":"password",
  "message":"Wrong email or password"
}]	
```

### Register 
#### POST /api/register
Request:
```
Body:
{
  "phone": "+380xxxxxxxxx", // optional
  "name": "Alex", 
  "email": "alex@mail.com", 
  "password":"qwerty",
}

```
Responses:
```
200, OK
Body:
{
  "token": "eyJhbGciOiJIUNiJ9.Mw.oAxY8cg69l1gnfVkl8VU5LcJhT3pQbwLDUx5A"
}

422, Unprocessable Entity
Body: 
[{
  "field":"current_password",
  "message":"Wrong current password"
}]
```

### Get current user 
#### GET /api/me
Request:
```
Headers:
{
  "Authorization": "eyJhbGciOiJIUNiJ9.Mw.oAxY8cg69l1gnfVkl8VU5LcJhT3pQbwLDUx5A"
}
```
Responses:
```
200, OK
Body:
{
  "id": 1,
  "phone": "+380xxxxxxxxx", "name": "Alex",
  "email": "alex@mail.com"
}

401, Unauthorized
Body: empty
```

### Get items list 
#### GET /api/items
Responses:
```
200, OK
[{
  "id": 1,
  "created_at": <timestamp in seconds>, 
  "title": "Notebook", 
  "price": 5500.00,
  "image": "http://example.com/images//*.jpg", 
  "user_id": 12,
  "user": {
    "id": 1,
    "phone": "+380xxxxxxxxx", "name": "Alex",
    "email": "alex@mail.com"
  }
}]
```


### Get item by ID 
#### GET /api/items/<id>
Responses:
```
200, OK
Body:
{
  "id": 1,
  "created_at": <timestamp in seconds>, 
  "title": "Notebook", 
  "price": 5500.00,
  "image": http://example.com/images/**/*.jpg", 
  "user_id": 12,
  "user": {
    "id": 1,
    "phone": "+380xxxxxxxxx", "name": "Alex",
    "email": "alex@mail.com"
  }
}

404, Not found
Body: empty
```


### Update item 
#### PUT /api/items/<id>
Request:
```
Headers:
{
  "Authorization": "eyJhbGciOiJIUNiJ9.Mw.oAxY8cg69l1gnfVkl8VU5LcJhT3pQbwLDUx5A"
}

Body: 
{
  "title": "Notebook", //optional
  "price": 5500.00, //optional
}

```
Responses:
```
200, OK
Body:
{
  "id": 1,
  "created_at": <timestamp in seconds>, 
  "title": "Notebook", 
  "price": 5500.00,
  "image": "http://example.com/images/**/*.jpg", "user_id": 12,
  "user": {
    "id": 1,
    "phone": "+380xxxxxxxxx", "name": "Alex",
    "email": "alex@mail.com"
  }
}

422, Unprocessable Entity
[{
  "field":"title",
  "message":"Title should contain at least 3 characters"
}]

404, Not found
Body: empty

403, Forbidden
Body: empty
```

### Delete item 
#### DELETE /api/items/<id> 
Request:
```
Headers:
{
  "Authorization": "eyJhbGciOiJIUNiJ9.Mw.oAxY8cg69l1gnfVkl8VU5LcJhT3pQbwLDUx5A"
}

Body: 
{
  "title": "Notebook", //optional
  "price": 5500.00, //optional
}
```
Responses:
```
200, OK
Body: empty

404, Not found
 
Body: empty

403, Forbidden
Body: empty

401, Unauthorized
Body: empty
```


### Delete item 
#### POST /api/items  
Request:
```
Headers:
{
  "Authorization": "eyJhbGciOiJIUNiJ9.Mw.oAxY8cg69l1gnfVkl8VU5LcJhT3pQbwLDUx5A"
}

Body: 
{
  "title": "Notebook", //required
  "price": 5500.00, //required
}
```
Responses:
```
200, OK
Body:
{
  "id": 1,
  "created_at": <timestamp in seconds>, 
  "title": "Notebook", "price": 5500.00,
  "image": "http://example.com/images/**/*.jpg", 
  "user_id": 12,
  "user": {
  "id": 1,
  "phone": "+380xxxxxxxxx", "name": "Alex",
  "email": "alex@mail.com"
  } 
}

401, Unauthorized
Body: empty
```

### Upload item image
#### POST /api/items/<id>/images  
Request:
```
Headers:
{
  "Authorization": "eyJhbGciOiJIUNiJ9.Mw.oAxY8cg69l1gnfVkl8VU5LcJhT3pQbwLDUx5A"
  "Content-Type": "multipart/form-data"
}

Body:
file=<file>
```
Responses:
```
200, OK
Body:
{
  "id": 1,
  "created_at": <timestamp in seconds>, 
  "title": "Notebook", "price": 5500.00,
  "image": "http://example.com/images/**/*.jpg", 
  "user_id": 12,
  "user": {
  "id": 1,
  "phone": "+380xxxxxxxxx", "name": "Alex",
  "email": "alex@mail.com"
  } 
}

422, Unprocessable Entity
{
"field":"image",
"message":"The file {file} is too big. "
},
...

404, Not found
Body: empty

403, Forbidden
Body: empty

401, Unauthorized
Body: empty
```