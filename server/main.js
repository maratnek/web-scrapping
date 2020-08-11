"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
//import * as getOrderByUrl from './index.d';
var service_1 = require("./service");
// import bodyParser = require('body-parser')
// Create a new express app instance
var app = express();
// set static folder
app.use(express.static(path.join(__dirname, '../public')));
// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });
var handleServ = new service_1.CsvHandler();
handleServ.handler('streamser');
// parse application/json
var fs_1 = __importDefault(require("fs"));
var csv = require("csv-parser");
var ws = fs_1.default.createWriteStream('load.csv');
var service_2 = require("./service");
//const Busboy = require('busboy');
var csvStream = new service_2.CsvStream();
app.post('/scrap-service', function (req, res) {
    console.log('scrap-service');
    //req.pipe(csvStream)
    var CSV = csv({ separator: ';' });
    CSV.on('data', function (d) { return console.log('data csv', d); });
    req.pipe(CSV);
    req.on('data', function (d) {
        console.log('data', d.toString());
    });
    req.on('error', function (err) { return console.error(err); });
    req.on('close', function () {
        res.json("good");
        console.log('close');
    });
});
// const multer = require('multer');
// const csv = require('fast-csv');
// const router = express.Router();
// const upload = multer({dest: './tmp/csv/'});
// router.post('/scrap-service', upload.single('file'), function (req, res, next) {
//     var fileRows = [], fileHeader;
//     // open uploaded file
//     csv.fromPath(req.file.path)
//       .on("data", function (data:any) {
//         fileRows.push(data); // push each row
//       })
//       .on("end", function () {
//         fs.unlinkSync(req.file.path);   // remove temp file
//         //process "fileRows"
//       });
//   });
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { return console.log("App is listening on port 3000!"); });
