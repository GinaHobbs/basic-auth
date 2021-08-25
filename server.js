'use strict';

// 3rd Party Resources
// require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const Users = require('./models/users.js');
const signin = require('./auth/signin.js');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
app.post('/signup', async (req, res) => {

    req.body.password = await bcrypt.hash(req.body.password, 10);
    Users.create(req.body).then(record => {
      console.log('record', record)
      res.status(201).json(record);
    }).catch(e => {
      console.log('console error', e);
      res.status(403).send(`Error Creating User`); 
    })
});


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
app.post('/signin', signin ,async (req, res) => {

  const { user } = req;
  console.log(`the user being sent is: ${user}`)
  res.status(200).send(user);
});

module.exports = app;