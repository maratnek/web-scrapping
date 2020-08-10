"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
//import CsvHandler from './index';// require('./index');
// import bodyParser = require('body-parser')
// Create a new express app instance
var app = express();
// set static folder
app.use(express.static(path.join(__dirname, '../public')));
// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });
//let handleServ = new CsvHandler();
//handleServ.handle('streamser');
// parse application/json
app.post('/scrap-service', function (req, res) {
    console.log('scrap-service');
    req.on('data', function (d) { return console.log(d.toString()); });
    req.on('error', function (err) { return console.error(err); });
    req.on('close', function () {
        res.json("good");
        console.log('close');
    });
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { return console.log("App is listening on port 3000!"); });
