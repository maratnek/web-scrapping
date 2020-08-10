import express = require('express');
import path = require('path');
//import CsvHandler from './index';// require('./index');
// import bodyParser = require('body-parser')

// Create a new express app instance
const app: express.Application = express();

// set static folder
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

//let handleServ = new CsvHandler();
//handleServ.handle('streamser');

// parse application/json

app.post('/scrap-service', (req,res)=>{
    console.log('scrap-service');
    req.on('data', d => console.log(d.toString()));
    req.on('error', err => console.error(err));
    req.on('close', ()=> {
        res.json("good");
        console.log('close')
});
    
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>  console.log("App is listening on port 3000!"));