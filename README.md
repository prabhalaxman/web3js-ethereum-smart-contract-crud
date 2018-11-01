# rest-api-expressjs-mongodb

###Creating a REST API using Node.js, Express, and MongoDB

####Installing Node.js,express,mongo db,mutler,body-parser,jwt,morgan,nodeman

all the APIs are written in api.js

open terminal and run the following

# cd rest-api-expressjs-mongodb
# nodeman index.js


Here in this project i have done CRUD for user with jwt authrization

For testing purpose i used postman rest client you can use as your wish

To signup new user API

Type : Post

http://localhost:8080/api/signup

content type : application/json

data : {"name":"test2","password":"1234test@34ter2","admin":true}

response : {
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOWI5NDAyNTI2MTIxMTU5ODUxYTgzNSIsImlhdCI6MTUzNjkyMjYyNn0.BpaSo5pi0fE2wlgXrzHX8yXUvJpXBxsxAatY6mwJ89E"
}

To check token is authorized 

Method : Get

http://localhost:8080/api/authenticate2

header : key - x-access-token value : token generated

response : {
    "_id": "5b9b9402526121159851a835",
    "name": "test2",
    "admin": true,
    "__v": 0
}

To login : 

Method : POst

http://localhost:8080/api/login

req : {"name":"testing","password":"1234test@34ter2"}

response : {
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOWI5NDAyNTI2MTIxMTU5ODUxYTgzNSIsImlhdCI6MTUzNjkyMzg5NiwiZXhwIjoxNTY4NDU5ODk2fQ.Ib2Pzulmj6HcYu0kMVJL_Etf-U0wvkI4o-BzNm7gXXs"
}

Update user : 

http://localhost:8080/api/users/:id

Method : Put

Request : {"name":"testing"}

Response : {
    "_id": "5b9b9402526121159851a835",
    "name": "testing",
   
    "admin": true,
    "__v": 0
}

To list user : 

Method : Get 

http://localhost:8080/api/users

Response : [
    {
        "_id": "5b9b9402526121159851a835",
        "name": "testing",
        "admin": true,
        "__v": 0
    }
]

To delete User : 

Method : Delete 

http://localhost:8080/api/users/:id

response : {
    "message": "User with id :id removed."
}





# web3js-ethereum-smart-contract-crud
