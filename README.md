# shoppingCart_api
Run `npm run dev` for a dev server.
This project was built with node.js + express.

# Getting started
1. Run `npm install` to resolve all dependencies (might take a minute).
2. Run `npm run dev` for a dev server. 

# Endpoints

###Registration:

`POST /users`

Example request body:
```JSON
{
	"name": "Test1",
	"password": "test1",
	"email": "test1@g.com"
}
```
No authentication required, returns a User
```JSON
{
    "role": "editor",
    "avatar": "uploads/2b3b787fdeb42b4364dffa3920f89d4e",
    "_id": "5d1f3d600870e32614ccdedd",
    "name": "Test1",
    "password": "$2b$08$cn09n7Koukg0BoZlCiDgxOdS.2QJrqh8XwuQWN4Ot6gqDW8bWobSy",
    "email": "test1@g.com"
}
```
