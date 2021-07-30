const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const Nightmare = require('nightmare')
const cheerio = require('cheerio');

const saveGood = require('./db');

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
  const nightmare = Nightmare({ show: false, waitTimeout: 2000 })
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
    data = [];
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
      
      if (link)
        saveGood({link: link, stars: stars, order, title});
    });
    commonCards += cardsBlock.length;
  }

  const waitSelectore = "#shop-products";

  console.log(URL)
  const nightmare = Nightmare({ show: false, waitTimeout: 6000, height: 3000 })
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
        .wait(1000)
    }
    console.log('Scroll to 0')
    await nightmare.scrollTo(0, 0)
      .wait(1000)

  }

  async function findGoods() {
    console.log('Find goods with selectore ', waitSelectore);
    let curHeight = 0;
    await nightmare.evaluate(() => {
      return document.querySelector('#shop-products').scrollHeight;
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
        .wait('#shop-products')
        .evaluate(() => document.querySelector('#shop-products').innerHTML)
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

function sleep( sleepDuration ){
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

const getCategoryByUrl = async URL => {
  let commonCards = 0;
  let goodMap = new Map;
  let getData = async html => {
    data = [];
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

      // saveGood({link, stars, order, title});

      if (link)
        goodMap.set(link, { stars, order, title });
    });
    commonCards += cardsBlock.length;
  }

  const waitSelectore = "#category-products";

  console.log(URL)
  const nightmare = Nightmare({ show: false, waitTimeout: 4000, height: 1000 })
  let order = '-1';
  console.log('nightmare create, get store')

  await nightmare
    .goto(URL)
    .wait(waitSelectore)

  async function scroll() {
    console.log('Scroll all');
    let prevHeight = -1, curHeight = 0;
    // while (prevHeight !== curHeight) {
    while (true) {
      prevHeight = curHeight;
      await nightmare.evaluate(() => {
        // return document.querySelector(waitSelectore).scrollHeight;
        return {height: document.querySelector('footer').offsetTop, data: document.querySelector('#category-products').innerHTML};
      })
        .then((param) => {
          let height = param.height;
          let response = param.data;
          order = getData(response);
          curHeight = height;
          // console.log('Some int ', response);
          console.log('HeighT: ', height);
          let diff = height - prevHeight;
          console.log('diff: ', height - prevHeight);
          if (diff == 0) {
            sleep(4000);
          }
        })
        .catch(err => console.log('Some err', err));

      console.log('current HeighT: ', curHeight);
      await nightmare.scrollTo(curHeight, 0)
        .wait(1000)
    }
    console.log('Scroll to 0')
    await nightmare.scrollTo(0, 0)
      .wait(3000)

  }

  async function findGoods() {
    console.log('Find goods with selectore ', waitSelectore);
    let curHeight = 0;
    await nightmare.evaluate(() => {
      return document.querySelector('#shop-products').scrollHeight;
    })
      .then(height => {
        curHeight = height;
        console.log('HeighT: ', height);
      })
      .catch(err => console.log('Some err', err));

    console.log('Find goods with selectore ', waitSelectore);
    let height = 0;
    // while (height <= curHeight) {
    while (height <= curHeight) {
      await nightmare
        .wait('#category-products')
        .evaluate(() => document.querySelector('#category-products').innerHTML)
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
  // await findGoods();
  await nightmare.end();

  for (const it of goodMap) {
    console.log('Map it: ', it);
  }
  console.log('Good map length:', goodMap.size);
  console.log('Common cards length: ', commonCards);

  return order;

}


// getOrderByUrl('https://kazanexpress.ru/product/221974');
// getStoreByUrl('https://kazanexpress.ru/alistore');
// getStoreByUrl('https://kazanexpress.ru/pichee');
// getStoreByUrl('https://kazanexpress.ru/seletstore');
// getStoreByUrl('https://kazanexpress.ru/1001');
// getCategoryByUrl('https://kazanexpress.ru/category/Vse-kategorii-1?sorting=orders&ordering=descending');

// for (var i = 0; i < 100000; ++i) 
{
  console.log('start by stock');
  let num = 3;
  // getStoreByUrl(`https://kazanexpress.ru/${num}`);
  num = 1001;
  // getStoreByUrl(`https://kazanexpress.ru/${num}`);
  // getStoreByUrl('https://kazanexpress.ru/alistore');
}

module.exports = {
  getOrderByUrl,
  getCsvStream,
  writeCsvData,
  getStoreByUrl,
  csv
};

