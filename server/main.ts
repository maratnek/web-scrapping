import express = require('express');
import path = require('path');
//import * as getOrderByUrl from './index.d';
import {CsvHandler} from './service';
// import bodyParser = require('body-parser')

// Create a new express app instance
const app: express.Application = express();

// set static folder
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

let handleServ = new CsvHandler();
handleServ.handler('streamser');

// parse application/json
import fs from 'fs'
import * as Service from './scrap-service'
import csv = require('csv-parser');
let ws = fs.createWriteStream('load.csv');

import {CsvStream} from './service';
//const Busboy = require('busboy');
let csvStream = new CsvStream();
import {Readable} from 'stream';

app.post('/scrap-service', (req,res)=>{
    console.log('scrap-service')
    //req.pipe(csvStream)

    let CSV = csv({separator:';'})
    CSV.on('data', d => console.log('data csv', d))
    req.pipe(CSV) 
    req.on('data', d => {
        console.log('data', d.toString())
    });
    req.on('error', err => console.error(err));
    req.on('close', ()=> {
        res.json("good");
        console.log('close')
});
})

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>  console.log("App is listening on port 3000!"));