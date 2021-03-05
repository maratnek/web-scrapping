const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const Nightmare = require('nightmare')
const cheerio = require('cheerio');

const getOrderByUrl = async URL => {
    let getData = html => {
        data = [];
        const $ = cheerio.load(html);
        let order = $('.stats .orders').text();
        console.log('Order:', order);
        let str = $('.region').text();
        console.log(str);
        order = order.replace(/\n/g, ' '); 
        order = order.match(/\d+/g); 
        console.log(order);
        if (order) {
          console.log('data nightmare: ', order[0])
        return order[0];
        }
        else
          return '0';
      }

    console.log(URL)
    const nightmare = Nightmare({ show: false,  })
    let order;
    console.log('nightmare create')
    await nightmare
    .goto(URL)
    .wait('#product-info')
    .evaluate(() => document.querySelector('#product-info').innerHTML)
    .end()
    .then(response => {
      order = getData(response);
    }).catch(err => {
      console.log(err);
    });

    return order;
  
}

let csvData = [];


let writeCsvData = async (csv_data) => {
  const fileName = `output/kznexpress-out-${Date.now()}.csv`; 
  fs.writeFileSync(fileName, '');
  const csvWriter = createCsvWriter({
    path: fileName,
    fieldDelimiter:';',
    recordDelimiter:'\r\n',
    encoding: 'utf8',
    header: [
      {id: 'URL', title: 'URL'},
      {id: 'Orders', title: 'ORDERS'},
      {id: 'Count', title: 'COUNT'}
    ]
  });
  console.log('Write to file', csv_data);
  csvWriter.writeRecords(csv_data)
  .then(()=> console.log('The CSV file was written successfully')); 
}

let startThisModule = async ()=>{


fs.createReadStream('kznexpress.csv')
  .pipe(csv({separator:';'}))
  .on('data', (row) => {
    csvData.push(row);

  })
  .on('end', async () => {
    console.log('CSV file successfully processed');
    for (const itCsv of csvData) {
      itCsv.Orders = await getOrderByUrl(itCsv.URL);
      console.log(itCsv)

    }
    writeCsvData(csvData);

  });

};

const getCsvStream = async () => {
  return csv({separator:';'});
};


getOrderByUrl('https://kazanexpress.ru/product/221974');

module.exports = {
  getOrderByUrl, 
  getCsvStream,
  writeCsvData,
  csv
};

