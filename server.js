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
mongoose.connect(mongoDB, { useMongoClient: true });
mongoose.Promise = global.Promise;
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

app.delete('/votes/:id', function(req, res) {
  Vote.findByIdAndRemove(req.params.id, function(err, vote) {
    if(err) {
      res.send(err);
    } else {
      let response = {
        message: "Vote successfully deleted",
        id: vote._id
      };
      res.status(200).send(response);
    }
  })
});

app.get('/votes/previous', function(req, res) {
  Vote.find({votingLive: false}, function(err, votes) {
    if (err)
      res.send(err);
    res.json(votes);
  });
});

app.get('/votes/current', function(req, res) {
  Vote.findOne({votingLive: true}, {}, { sort: { 'created_at' : -1 } }, function(err, vote) {
    if (err) res.send(err);
    res.json(vote);
  });
});

app.post('/vote/new', function(req, res) {
  var vote = new Vote({
    votingLive: true,
    options: req.body.options
  });
  vote.save(function(err,doc){
    if(err)
      res.send(err);
    else res.status(200).send(doc);
  });
});

app.put('/vote/choose', function(req, res) {
  Vote.findOneAndUpdate(
    {"_id" : req.body.id, "options.text": req.body.option},
    {$inc: {"options.$.value":1}},
    {new: true},
    function(err, doc) {
      if(err)
        res.send(err);
      else res.status(200).send(doc);
    }
  );
})

app.put("/vote/end", function(req, res) {
  Vote.findById(req.body.id, function(err, vote) {
    if(err) res.send(err);
    else {
      vote.votingLive = false;
      vote.save(err => {
        if(err) console.log("ERR");
        else res.status(200).send(vote);
      });
    }
  });
});

app.put("/vote/reset", function(req, res) {
  Vote.findById(req.body.id, function(err, vote) {
    if(err)
      res.send(err);
    vote.options.forEach(option => option.value = 0);
    vote.save(err => {
      if(err) console.log("ERR");
      else res.status(200).send(vote);
    });
  });
});

app.listen(process.env.PORT || 8080, function() {
  console.log(`api running on port ${process.env.PORT || 8080}`);
});