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

    nightmare: any = Nightmare({ show: true, waitTimeout: 4000 });

    constructor() {
        console.log('Scrap constructor');
    }
    async is_stock(URL: string) {
        let checkData = (html: string):boolean => {
            const $ = cheerio.load(html);
            // console.log(html);
            let page404 = $('.page404-express');
            if (page404 && page404.text().length > 0) { 
                console.log("page404", page404.text());
            } else { 
                let shop = $('#shop-header-container');
                if (shop) { 
                    console.log("Add new shop", shop.text());
                    return true;
                }
            }
            return false;
        }

        const waitSelectore = ".main-content";
        console.log(URL)
        let is_exist = false;

        // let NGmare: any = Nightmare({ show: false });
        await this.nightmare 
            .goto(URL)
            .wait(waitSelectore)
            .evaluate(() => document.querySelector(".main-content")!.innerHTML)
                    .then((response: string) => {
                        is_exist = checkData(response);
                    }).catch((err: number) => {
                        console.log('Fail search', err);
                    });
            // this.nightmare.end();
        return is_exist;
    }

        async NGscroll() {
            console.log('Scroll all');
            let prevHeight: number = -1, curHeight: number = 0;
            while (prevHeight !== curHeight) {
                prevHeight = curHeight;
                await this.nightmare.evaluate((): number => {
                    return document.querySelector('footer')!.offsetTop;
                }).then((height: number) => {
                    curHeight = height;
                }).catch((err: number) => console.log('Some err', err));

                await this.nightmare.scrollTo(curHeight, 0)
                    .wait(1000)
            }
            await this.nightmare.scrollTo(0, 0)
                .wait(1000)
        }

        getData(html: string):Map<string, OrderGood> {
            let goodMap = new Map<string, OrderGood>();
            let data: any[] = [];
            const $ = cheerio.load(html);
            let cardsCount = $('.products-list').children();
            let cardLink = $('.card-express');

            $('.card-info-block').each( (i: number, elem: any) => {
                let link  = $(elem).parent().parent().attr('href');
                let title = $(elem).children('.subtitle').text();
                let stars : any = $(elem).find('.raiting-wrapper').text().match(/\d.\d+/g);
                let order : any = $(elem).find('.orders').contents().filter((tt: any) => {
                    return tt == '1';
                }).text();
                order = order.replace(/\n/g, ' ');
                order = order.match(/\d+/g);
                let good = new OrderGood(link!, parseInt(stars!? stars: 0), parseInt(order!? order: 0), title);
                if (link)
                    goodMap.set(link, good);
                // ++commonCards;
            });
            return goodMap;
        }

        async findGoods() {
            // console.log('Find goods with selectore ', waitSelectore);
            let goodMap : any;
            let curHeight = 0;
            await this.nightmare.evaluate(() => {
                return document.querySelector('#shop-products')!.scrollHeight;
            }).then((height: number) => {
                curHeight = height;
            }).catch((err: number) => console.log('Some err', err));

            let height = 0;
            while (height <= curHeight) {
                await this.nightmare
                    .wait('#shop-products')
                    .evaluate(() => document.querySelector('#shop-products')!.innerHTML)
                    .then((response: string) => {
                        goodMap = this.getData(response);
                    }).catch((err: number) => {
                        console.log('Fail search', err);
                    });

                height += 2000;
                await this.nightmare.scrollTo(height, 0)
                    .wait(1000);
            }
            return goodMap;

        }

    async scroll(URL: string) {
        console.log('Start scroll scrap by url');

        // let commonCards = 0;

        const waitSelectore = "#shop-products";

        console.log(URL)
        const nightmare = Nightmare({ show: false, waitTimeout: 4000, height: 3000 })

        console.log('nightmare create, get store')

        await this.nightmare
            .goto(URL)
            .wait(waitSelectore)

        await this.NGscroll();
        let goodMap = await this.findGoods();
        // await nightmare.end();

        return goodMap;

    }


}