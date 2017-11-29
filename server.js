'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var Vote = require('./model/votes');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

//db config
var mongoDB = process.env.MONGODB;
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
 
app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/votes', function(req, res) {
  Vote.find(function(err, votes) {
    if (err)
      res.send(err);
    res.json(votes);
  });
});

app.get('/latest', function(req, res) {
  Vote.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, vote) {
    if (err) res.send(err);
    res.json(vote);
  });
});

app.post('/votes', function(req, res) {
  var vote = new Vote({
    id: mongoose.Types.ObjectId(),
    title: req.body.title,
    options: req.body.options
  });
  vote.save(function(err,doc){
    if(err) {
      res.send(err);
    res.json(vote);
    }
  });
});

app.put('/vote/option', function(req, res) {
  console.log(req.body);
  Vote.findOneAndUpdate(
    {"_id" : req.body.id, "options.text": req.body.option},
    {$inc: {"options.$.value":1}},
    {new: true},
    function(err, doc) {
      if(err)
        res.send(err);
      res.send(doc);
    }
  );
})

app.listen(process.env.PORT || 8080, function() {
  console.log(`api running on port ${process.env.PORT || 8080}`);
});