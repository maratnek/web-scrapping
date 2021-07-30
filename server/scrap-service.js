const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const Nightmare = require('nightmare')
const cheerio = require('cheerio');

const getOrderByUrl = async URL => {
  let getData = html => {
      // console.log('html', html)
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
  const nightmare = Nightmare({ show: false })
  let order = '-1';
  console.log('nightmare create')
  await nightmare
    .goto(URL)
    .wait('#product-info')
    .evaluate(() => document.querySelector('#product-info').innerHTML)
    .end()
    .then(response => {
      order = getData(response);
    }).catch(err => {
      console.log('Fail search', err);
    });

  return order;

}

const getStoreByUrl = async URL => {
  let commonCards = 0;
  let goodMap = new Map;
  let getData = html => {
    // let data = [];
    const $ = cheerio.load(html);
    let cardsCount = $('.products-list').children();
    console.log('Cards count: ', cardsCount.length);
    let cardLink = $('.card-express');

    let cardsBlock = $('.card-info-block');
    cardsBlock.each(function (i, elem) {
      let link = $(this).parent().parent().attr('href');
      let title = $(this).children('.subtitle').text();
      let stars = $(this).find('.raiting-wrapper').text();
      // stars = stars.replace(/\n/g, ' ');
      stars = stars.match(/\d.\d+/g);
      let order = $(this).find('.orders').contents().filter(function () {
        return this.nodeType == 3;
      }).text();
      order = order.replace(/\n/g, ' ');
      order = order.match(/\d+/g);
      console.log(`Cards info: ${i} card dummy: ${title}`);
      console.log(`Cards info: ${i} card dummy: ${order}`);
      console.log(`Cards info: stars: ${stars}`);
      console.log(`link: ${link}`);

      if (link)
        goodMap.set(link, { stars, order, title });
    });
    commonCards += cardsBlock.length;
  }

  const waitSelectore = "#shop-products";

  console.log(URL)
  const nightmare = Nightmare({ show: true, waitTimeout: 4000, height: 1200 })
  let order = '-1';
  console.log('nightmare create, get store')

  await nightmare
    .goto(URL)
    .wait(waitSelectore)

  async function scroll() {
    console.log('Scroll all');
    let prevHeight = -1, curHeight = 0;
    while (prevHeight !== curHeight) {
      prevHeight = curHeight;
      await nightmare.evaluate(() => {
        // return document.querySelector(waitSelectore).scrollHeight;
        return document.querySelector('footer').offsetTop;
      })
     .then(height => {
          curHeight = height;
          console.log('HeighT: ', height);
          console.log('diff: ', height - prevHeight);
      })
      .catch(err => console.log('Some err', err));

      console.log('current HeighT: ', curHeight);
      await nightmare.scrollTo(curHeight, 0)
        .wait(2000)
    }
    console.log('Scroll to 0')
    await nightmare.scrollTo(0, 0)
      .wait(1000)

  }

  async function findGoods() {
    console.log('Find goods with selectore ', waitSelectore);
    let curHeight = 0;
    await nightmare.evaluate(() => {
      return document.querySelector(waitSelectore).scrollHeight;
    })
      .then(height => {
        curHeight = height;
        console.log('HeighT: ', height);
      })
      .catch(err => console.log('Some err', err));

    console.log('Find goods with selectore ', waitSelectore);
    let height = 0;
    while (height <= curHeight) {
      await nightmare
        .wait(waitSelectore)
        .evaluate(() => document.querySelector(waitSelectore).innerHTML)
        .then(response => {
          // console.log('Responce ', response);
          order = getData(response);
        }).catch(err => {
          console.log('Fail search', err);
        });

      height += 2000;
      console.log('current HeighT: ', height);
      await nightmare.scrollTo(height, 0)
        .wait(1000);
    }

  }

  await scroll();
  await findGoods();
  await nightmare.end();

  for (const it of goodMap) {
    console.log('Map it: ', it);
  }
  console.log('Good map length:', goodMap.size);
  console.log('Common cards length: ', commonCards);

  return order;

}

let csvData = [];


let writeCsvData = async (csv_data) => {
  const fileName = `output/kznexpress-out-${Date.now()}.csv`;
  fs.writeFileSync(fileName, '');
  const csvWriter = createCsvWriter({
    path: fileName,
    fieldDelimiter: ';',
    recordDelimiter: '\r\n',
    encoding: 'utf8',
    header: [
      { id: 'URL', title: 'URL' },
      { id: 'Orders', title: 'ORDERS' },
      { id: 'Count', title: 'COUNT' }
    ]
  });
  console.log('Write to file', csv_data);
  csvWriter.writeRecords(csv_data)
    .then(() => console.log('The CSV file was written successfully'));
}

let startThisModule = async () => {


  fs.createReadStream('kznexpress.csv')
    .pipe(csv({ separator: ';' }))
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
  return csv({ separator: ';' });
};


// getOrderByUrl('https://kazanexpress.ru/product/221974');
// getStoreByUrl('https://kazanexpress.ru/alistore');
// getStoreByUrl('https://kazanexpress.ru/pichee');
// getStoreByUrl('https://kazanexpress.ru/seletstore');
getStoreByUrl('https://kazanexpress.ru/1001');

module.exports = {
  getOrderByUrl,
  getCsvStream,
  writeCsvData,
  getStoreByUrl,
  csv
};

