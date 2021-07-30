import express = require('express');
import path = require('path');
// import fs from 'fs'
import * as Service from './scrap-service'
import csv = require('csv-parser');
// import { json } from 'body-parser';

import {Scrap} from './service.js';

const scrap = new Scrap();
// scrap.scroll('https://kazanexpress.ru/alistore');
scrap.scroll('https://kazanexpress.ru/1001');

// Create a new express app instance
const app: express.Application = express();

// set static folder
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.json());

const EventEmitter = require('events');

const Stream = new EventEmitter(); // my event emitter instance
app.get('/events', async function(req, res) {
    console.log('Got /events');
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive'
    });
    res.flushHeaders();

    // Tell the client to retry every 10 seconds if connectivity is lost
    res.write('retry: 10000\n\n');
    let count = 0;
    Stream.on("push", function(event : any, data : any) {
        //console.log('push data');
        //res.write("event: " + String(event) + "\n" + "data: " + JSON.stringify(data) + "\n\n");
        
       res.write(`data: ${JSON.stringify(data)}\n\n`);
      });
  });    ;

// parse application/json



app.post('/scrap-service', (req,res)=>{
    console.log('scrap-service')
    
    let csvData : any = [];
    let CSV = csv({separator:';'})
    CSV.on('data', (d) => {
        console.log('data csv', d)
        if (d.URL)
           csvData.push(d);
    })
    CSV.on('end', async () => {
        console.log('CSV file successfully processed');
        for (const itCsv of csvData) {
          itCsv.Orders = await Service.getOrderByUrl(itCsv.URL);
          itCsv.Count = 0; //itCsv.Orders.match(/\d+/g);

          console.log(itCsv)
          Stream.emit("push", "test", itCsv);
    
        }
        await Service.writeCsvData(csvData);
    });

    req.pipe(CSV) 
    req.on('data', d => {
        console.log('data', d.toString())
        res.status(200).end();
    });
    req.on('error', err => console.error(err));
    req.on('close', ()=> {
        console.log('close')
    });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>  console.log(`App is listening on port https://localhost:${PORT}!`));