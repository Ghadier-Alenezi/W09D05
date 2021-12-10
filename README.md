# Social Media front-end

## Description

## a social app to post, comment and communicate with others posts with user authentication and authorization using Mongoo, Express, React, node js and Redux.

## User Stories

- Register: fot this app I need to register a new account
- Log in: to add a new post, comment other posts and like it, I need to log in to the app using email and password already registerd or you can login with your google account
- Log out to keep my account privet
- Add a post: as a user I can add a new post to my account
- Show posts: as a user I can show my previous posts, any other user posts
- Update a post: as a user I can update any post I have
- Delete a post: as a user I can delete any of my posts
- Add a comment: as a user I can add a new comment to any other user posts
- show comments: as a user I can show any of the comments in my posts
- show comments: as a user I can show any of the comments for any user
- Update Comment: as a user I can edit any comment written by me
- Delete Comment: as a user I can delete any comment written by me
- like a post: as a user I can like any post
- Admin can delete any user with posts and comment relative to that user
- Admin can show all users

---

# Client / Frontend

## React Router Routes (React App)

| Path         |  Component  |                                                       Behavior |
| :----------- | :---------: | -------------------------------------------------------------: |
| /            |  Timeline   |                                                      Home page |
| /register    |  Register   | Signup input, link to login, navigate to homepage after signup |
| /login       |    Login    |  Login input, link to signup, navigate to homepage after login |
| /profile     |   Profile   |                user page, account info, posts, comments, likes |
| /admin       |    Admin    |                         Admin page, all users, delete any user |
| /verifyEmail | VerifyEmail |            Verify Email enter the code that sent to user email |

## Components

- Register
- VerifyEmail
- Login
- Timeline
- User
- Admin
- Post
- Comment
- Like

---

# UML Diagram

## ![alt text]()

# Server / Backend

## Models

### user model

```
const mongoose = require("mongoose");

const user = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  isDel: {type: Boolean, default: false},
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
});

module.exports = mongoose.model("User", user);
```

### role model

```

const mongoose = require("mongoose");

const role = new mongoose.Schema({
  role: { type: String, required: true },
  Permissions: { type: Array, required: true },
});

module.exports = mongoose.model("Role", role);
```

### post model

```

const mongoose = require("mongoose");

const post = new mongoose.Schema(
  {
    title: { type: String },
    desc: { type: String, required: true },
    img: { type: String },
    createdAt: {type: Date, default: Date.now()},
    isDel: { type: Boolean, default: false },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  }
);

module.exports = mongoose.model("Post", post);
```

### comment model

```
const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  desc: { type: String, required: true },
  isDel: { type: Boolean, default: false },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  post: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("Comment", comment);

```

### Like model

```
const mongoose = require("mongoose");

const like = new mongoose.Schema({
  isLiked: { type: Boolean, default: false },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  post: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("Like", like);
```

## Backend routes

| HTTP Method |        URL         |                               Request Body | Success status | Error Status |                                                                                                        Description |
| :---------- | :----------------: | -----------------------------------------: | -------------: | -----------: | -----------------------------------------------------------------------------------------------------------------: |
| post        |     /register      | {userName, email, password, avatar, role } |            201 |          400 |                                                     create user with encrypted password, and store user in session |
| post        |       /login       |                         {email, password } |            200 |          400 | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| get         |       /users       |                                    {empty} |            200 |          400 |                                                                              Make admin check all users in the app |
| put         |     /user/:id      |        {userName, email, password, avatar} |            200 |          400 |                                                                                       Make user update his profile |
| post        |      /newPost      |                        { title, desc, img} |            201 |          400 |                                                                                             Make user add new post |
| get         |     /userPost      |                                    {empty} |            200 |          400 |                                                                                    Make user show all of the posts |
| put         |  /updatePost/:id   |                                   { desc } |            200 |          400 |                                                                                  Make user update post description |
| put         |  /deletePost/:id   |                                  { empty } |            200 |          400 |                                                                                          Make user delete any post |
| post        |  /newComment/:id   |                                   { desc } |            201 |          400 |                                                                                        Make user publish a comment |
| get         |     /comments      |                                  { empty } |            200 |          400 |                                                                                         Make user see all comments |
| put         | /updateComment/:id |                                   { desc } |            200 |          400 |                                                                                         Make user update a comment |
| put         | /deleteComment/:id |                                  { empty } |            200 |          400 |                                                                                         Make user delete a comment |
| post        |     /liked/:id     |                                  { empty } |            200 |          400 |                                                                                              Make user like a post |
| get         |      allLikes      |                                  { empty } |            200 |          400 |                                                                                           Make user show all likes |

## Links

[backend-repo](https://github.com/Ghadier-Alenezi/W08D04)
