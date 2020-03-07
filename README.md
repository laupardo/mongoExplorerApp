# mongoExplorerApp
## Description
App that lists dbs and lets you pick a dbs and visualize it's collections. You can also add documents to those collections. The app has a little quirk, can you find it?

This corresponds to the first option of the assignment 8 AM Saturday March, 7 deadline. Basic requirements+deployment and create documents in collections. 
## Author

- [Laura Pardo](https://laupardo.github.io/index.html)   :girl:

## Check it out
[Link](https://mongoexplorerlpb.herokuapp.com/)

## You will need 
- [Nodejs](https://nodejs.org/es/download/)
- [Mongodb](https://www.mongodb.com/download-center/community)

## How to run it as a developer 
Go to where your MongoDB folder is located eg. and run mongod
```
C:\Program Files\MongoDB\Server\4.2\bin> mongod
```
and leave it running

Open a new cmd window and once again go to where you found mongod but this time run
```
C:\Program Files\MongoDB\Server\4.2\bin> mongo
```
Both are .exe.

Open a new cmd window and go to you projetct's path set environment variables accoring to your dbs admin user and password

```
SET MONGO_USER=<your admin>
SET MONGO_PWD=<your password>
```

```
npm install nodemon -g
```
```
npm install
```
If any error arises, aka module not found, use npm install <module name>. If all else fails, google it.
  
```
nodemon start
```
You should be able to acces through localhost port 3000.
  
# MIT License 
This project is licensed by the MIT [License](https://github.com/laupardo/mongoExplorerApp/LICENSE).
