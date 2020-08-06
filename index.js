const http = require('http');


// var options = {
//     host: 'www.google.com',
//     port: 80,
//     path: '/index.html'
//   };
  
//   http.get(options, function(res) {
//     console.log("Got response: " + res.statusCode);
//   }).on('error', function(e) {
//     console.log("Got error: " + e.message);
//   });

// const options = {
//   host: 'www.google.com',
// };
// const req = http.get(options);
// req.end();
// req.once('response', (res) => {
//   const ip = req.socket.localAddress;
//   const port = req.socket.localPort;
//   console.log(`Your IP address is ${ip} and your source port is ${port}.`);
//   console.log(req);
//   // Consume response object
// });

// var options = {
//     host: 'www.kazanexpress.com',
//     port: 80,
//     path: '/index.html'
//   };
  
//   http.get(options, function(res) {
//     console.log("Got response: " + res.statusCode);
  
//     res.on("data", function(chunk) {
//       console.log("BODY: " + chunk);
//     });
//   }).on('error', function(e) {
//     console.log("Got error: " + e.message);
//   });

// const https = require('https');

// const options = {
//   hostname: 'www.kazanexpress.com',
//   port: 443,
//   path: '/',
//   method: 'GET'
// };

// const req = https.request(options, (res) => {
//   //console.log('statusCode:', res.statusCode);
//   //console.log('headers:', res.headers);

//   res.on('data', (d) => {
//     process.stdout.write(d);
// const $ = cheerio.load(d);
// console.log($.html())
//   });
// });

// req.on('error', (e) => {
//   console.error(e);
// });
// req.end();

// var request = require('request');
// var options = {
//   'method': 'GET',
//   'url': 'https://kazanexpress.ru/product/221974',
//   'headers': {
//   }
// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   //console.log(response.body);
//  const $ = cheerio.load(response.body);
//  console.log($('body').text())
// });



//$('h2.title').text('Hello there!')
//$('h2').addClass('welcome')

//=> <h2 class="title welcome">Hello there!</h2>



const Nightmare = require('nightmare')
const cheerio = require('cheerio');

const urls = ['https://kazanexpress.ru/product/221974',
              'https://kazanexpress.ru/product/221975',
              'https://kazanexpress.ru/product/221976',
              'https://kazanexpress.ru/product/221977',
              'https://kazanexpress.ru/product/221978',
              'https://kazanexpress.ru/product/221999',]

const getOrderByUrl = async URL => {
    let getData = html => {
        data = [];
        const $ = cheerio.load(html);
        console.log($('.stats .orders span').text());
        return data;
      }

      console.log(URL)
const nightmare = Nightmare({ show: true,  })
    await nightmare
    .goto(URL)
    .wait('body')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
      console.log(getData(response));
    }).catch(err => {
      console.log(err);
    });
  

}

(async ()=>{
    console.log('start');
 //await getOrderByUrl(url);
 for (const url of urls) {
     
    await getOrderByUrl(url);
 }
    // getOrderByUrl(url1);
    // getOrderByUrl(url2);
    // getOrderByUrl(url3);
    // getOrderByUrl(url4);

})();
// getOrderByUrl(url2);
// getOrderByUrl(url3);
// getOrderByUrl(url4);
