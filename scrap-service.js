const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const Nightmare = require('nightmare')
const cheerio = require('cheerio');

const getOrderByUrl = async URL => {
    let getData = html => {
        data = [];
        const $ = cheerio.load(html);
        let str = $('.stats .orders span').text();
        str = str.replace(/\n/g, ''); 
        return str;
      }

    console.log(URL)
    const nightmare = Nightmare({ show: false,  })
    let order;
    console.log('nightmare create')
    await nightmare
    .goto(URL)
    .wait('body')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
      order = getData(response);
    }).catch(err => {
      console.log(err);
    });

    return order;
  
}


let csvData = [];

(async ()=>{
const csvWriter = createCsvWriter({
  path: 'kznexpress-out.csv',
  separator:';',
  header: [
    {id: 'URL', title: 'URL title'},
    {id: 'Orders', title: 'Orders title'}
  ]
});

fs.createReadStream('kznexpress.csv')
  .pipe(csv({separator:';'}))
  .on('data', (row) => {
    csvData.push(row);

  })
  .on('end', async () => {
    console.log('CSV file successfully processed');
    //console.log(csvData)
    for (const itCsv of csvData) {
      itCsv.Orders = await getOrderByUrl(itCsv.URL);
      console.log(itCsv)

    }
    console.log(csvData);
    csvWriter.writeRecords(csvData)
    .then(()=> console.log('The CSV file was written successfully')); 

  });

})();

module.exports = {getOrderByUrl};

