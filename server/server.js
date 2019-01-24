var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');

const app = express();

app.get('/pokemon/:name', (req, res) => {
    var name = req.params.name
    console.log(`here is the response ${name}`);
});

app.listen(3000, () => {
    console.log("listening on port 3000"); 
});

module.exports = {app};