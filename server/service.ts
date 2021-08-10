// import * as Service from './scrap-service';

const Nightmare = require('nightmare');
import cheerio from 'cheerio';

class OrderGood {
    name: string;
    stars: number;
    order: number;
    title: string;
    stock_id: number = 0;
    constructor(name: string, stars: number, order: number, title: string) {
        this.name = name;
        this.stars = stars;
        this.order = order;
        this.title = title;
    }
}

export class Scrap {
    constructor() {
        console.log('Scrap constructor');
    }
    async scroll(URL: string) {
        console.log('Start scroll scrap by url');

        let commonCards = 0;
        let goodMap = new Map<string, OrderGood>();
        let getData = (html: string) => {
            let data: any[] = [];
            const $ = cheerio.load(html);
            let cardsCount = $('.products-list').children();
            // console.log('Cards count: ', cardsCount.length);
            let cardLink = $('.card-express');

            $('.card-info-block').each( (i: number, elem: any) => {
                // console.log('Element', elem);
                // console.log(this);
                let link  = $(elem).parent().parent().attr('href');
                let title = $(elem).children('.subtitle').text();
                // let stars : any = $(this).find('.raiting-wrapper').text();
                // stars = stars.replace(/\n/g, ' ');
                let stars : any = $(elem).find('.raiting-wrapper').text().match(/\d.\d+/g);
                // console.log($(elem).find('.orders').contents());
                let order : any = $(elem).find('.orders').contents().filter((tt: any) => {
                    // console.log('tt', tt);
                    // return this.nodeType == 3;
                    // return tt.nodeType == 3;
                    return tt == '1';
                }).text();
                // console.log(order);
                order = order.replace(/\n/g, ' ');
                order = order.match(/\d+/g);
                // console.log(`Cards info: ${i} card dummy: ${title}`);
                // console.log(`Cards info: ${i} card dummy: ${order}`);
                // console.log(`Cards info: stars: ${stars}`);
                // console.log(`link: ${link}`);

                let good = new OrderGood(link!, parseInt(stars!? stars: 0), parseInt(order!? order: 0), title);


                if (link)
                    goodMap.set(link, good);

                ++commonCards;
                // if (link)
                // saveGood({ link: link, stars: stars, order, title });
            });
        }

        const waitSelectore = "#shop-products";

        console.log(URL)
        const nightmare = Nightmare({ show: false, waitTimeout: 4000, height: 3000 })
        console.log('nightmare create, get store')

        await nightmare
            .goto(URL)
            .wait(waitSelectore)

        async function scroll() {
            console.log('Scroll all');
            let prevHeight: number = -1, curHeight: number = 0;
            while (prevHeight !== curHeight) {
                prevHeight = curHeight;
                await nightmare.evaluate((): number => {
                    // return document.querySelector(waitSelectore).scrollHeight;
                    return document.querySelector('footer')!.offsetTop;
                }).then((height: number) => {
                    curHeight = height;
                    // console.log('HeighT: ', height);
                    // console.log('diff: ', height - prevHeight);
                }).catch((err: number) => console.log('Some err', err));

                // console.log('current HeighT: ', curHeight);
                await nightmare.scrollTo(curHeight, 0)
                    .wait(1000)
            }
            // console.log('Scroll to 0')
            await nightmare.scrollTo(0, 0)
                .wait(1000)

        }

        async function findGoods() {
            console.log('Find goods with selectore ', waitSelectore);
            let curHeight = 0;
            await nightmare.evaluate(() => {
                return document.querySelector('#shop-products')!.scrollHeight;
            }).then((height: number) => {
                curHeight = height;
                // console.log('HeighT: ', height);
            }).catch((err: number) => console.log('Some err', err));

            // console.log('Find goods with selectore ', waitSelectore);
            let height = 0;
            while (height <= curHeight) {
                await nightmare
                    .wait('#shop-products')
                    .evaluate(() => document.querySelector('#shop-products')!.innerHTML)
                    .then((response: string) => {
                        // console.log('Responce ', response);
                        getData(response);
                    }).catch((err: number) => {
                        console.log('Fail search', err);
                    });

                height += 2000;
                // console.log('current HeighT: ', height);
                await nightmare.scrollTo(height, 0)
                    .wait(1000);
            }

        }

        await scroll();
        await findGoods();
        await nightmare.end();

        // for (const it of goodMap) {
        //     console.log('Map it: ', it);
        // }
        // console.log('Good map length:', goodMap.size);
        // console.log('Common cards length: ', commonCards);

        return goodMap;

    }
}