var url = "mongodb+srv://group24:elevenbrethren@group24-ityll.mongodb.net/group24?retryWrites=true&w=majority";
const sgMail = require('@sendgrid/mail');
const first = "SG.";
const second = "vLpMY_RA";
const third = "SAi7s4YIUJQ";
const fourth = "1SQ.b_zjVlEotBBNW9Zh-NcOBnIT";
const fifth = "gNx-UibRYnitnHK0snU";
const last = first + second + third + fourth + fifth;
sgMail.setApiKey(last);
const msg = {
  to: 'steve.freedz42@gmail.com',
  from: 'devonsmath@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);


 /*
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const client = new MongoClient(url, { useUnifiedTopology: true , useNewUrlParser: true});
client.connect();

const db = client.db("maindb");

const newUser = {email:"Johnsmith@ymail.com", password:"nah", firstName:"Steve", lastName:"Fred"};
const result = db.collection('Users').insertOne(newUser);


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://group24:elevenbrethre@group24-ityll.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:true });
client.connect(err => {
  const collection = client.db("maindb").collection("Users");
  const newUser = {email:"Johnsmith@ymail.com", password:"nah", firstName:"Steve", lastName:"Fred"};
	collection.insertOne(newUser);
  client.close();
});*/