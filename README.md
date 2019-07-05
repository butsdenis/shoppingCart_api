# shoppingCart_api
This project was built with node.js + express.

# Getting started
1. Run `npm install` to resolve all dependencies (might take a minute).
2. Run `npm run dev` for a dev server. 

# Endpoints:

### Registration:

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

### Login:

`POST /users/login`

Example request body:
```JSON
{
	"password": "test1",
	"email": "test1@g.com"
}
```
Returns a token
```JSON
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDFmM2Q2MDA4NzBlMzI2MTRjY2RlZGQiLCJuYW1lIjoiVGVzdDEiLCJyb2xlIjoiZWRpdG9yIiwiaWF0IjoxNTYyMzI4ODMzLCJleHAiOjE5MjIzMjg4MzN9.l9qhPQI9_N79fKFdlYyaewUgjZKYBbIaAJLkexpUsFw"
}
```

### Edit user:

`PATCH /users/:id`

Example request body:
```JSON
{
	"name": "John",
	"password": "123456"
}
```
Returns a user
```JSON
{
    "role": "super",
    "avatar": "uploads/2b3b787fdeb42b4364dffa3920f89d4e",
    "_id": "5d1f3d600870e32614ccdedd",
    "name": "John",
    "password": "$2b$08$XkTkMWTtVptmPbqsD49MuO4UKOIEeJRWZHK.rQCrpD1KvjgO3DLKa",
    "email": "test1@g.com"
}
```

### User info:

`GET /users/me`

Returns a user info
```JSON
{
    "_id": "5cbdd3ccfd397819010432b2",
    "name": "Denis",
    "role": "editor",
    "iat": 1556871716,
    "exp": 1916871716
}
```

### All user:

`GET /users`

Returns a users 
```JSON
{
        "role": "editor",
        "avatar": "uploads/2b3b787fdeb42b4364dffa3920f89d4e",
        "_id": "5ccc3a5537b0322e4498eeac",
        "name": "Editor",
        "password": "$2b$08$Cjauwj/jtfJogajOhfXG0eAhdyeaUpkEowAg6I5wkmb8hWnI11P/m",
        "email": "editor@g.com"
    },
    {
        "role": "admin",
        "avatar": "uploads/2b3b787fdeb42b4364dffa3920f89d4e",
        "_id": "5ccc3a6837b0322e4498eead",
        "name": "Admin",
        "password": "$2b$08$acqd7eUURvWmpM0w1y1IvuAN2KWQoX5mrAiGQZwuzpFzGPws1zp.a",
        "email": "admin@g.com"
    } ...
```

### Delete user:

`DELETE /users/:id`

Returns a deleted user 
```JSON
{
    "role": "editor",
    "avatar": "uploads/2b3b787fdeb42b4364dffa3920f89d4e",
    "_id": "5ccc3ae737b0322e4498eeaf",
    "name": "Test",
    "password": "$2b$08$CUmXNmAJY5Fg67JjjIebLOZ.8jMgR1fV01iauBZZ/K6owxHxvzJIW",
    "email": "test@g.com"
}
```
