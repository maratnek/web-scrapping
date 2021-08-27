"use strict";
// import * as Service from './scrap-service';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scrap = exports.OrderGood = void 0;
var Nightmare = require('nightmare');
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var csv_writer_1 = require("csv-writer");
var OrderGood = /** @class */ (function () {
    function OrderGood(name, stars, order, price, old_price, title) {
        this.stock_id = '';
        this.name = name;
        this.stars = stars;
        this.order = order;
        this.title = title;
        this.price = price;
        this.old_price = old_price;
    }
    return OrderGood;
}());
exports.OrderGood = OrderGood;
var Scrap = /** @class */ (function () {
    function Scrap() {
        this.nightmare = Nightmare({ show: false, waitTimeout: 4000 });
        console.log('Scrap constructor');
    }
    Scrap.prototype.writeCsvData = function (csv_data) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, csvWriter;
            return __generator(this, function (_a) {
                fileName = "output/kznexpress-out-" + Date.now() + ".csv";
                fs_1.default.writeFileSync(fileName, '');
                csvWriter = csv_writer_1.createObjectCsvWriter({
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
                    .then(function () { return console.log('The CSV file was written successfully'); });
                return [2 /*return*/];
            });
        });
    };
    Scrap.prototype.getOrderByUrl = function (URL) {
        return __awaiter(this, void 0, void 0, function () {
            var getData, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getData = function (html) {
                            var data = [];
                            var $ = cheerio_1.default.load(html);
                            var order = $('.stats .orders').text();
                            console.log('Order:', order);
                            var str = $('.region').text();
                            console.log(str);
                            order = order.replace(/\n/g, ' ');
                            order = order.match(/\d+/g);
                            console.log(order);
                            if (order) {
                                console.log('data nightmare: ', order[0]);
                                return order[0];
                            }
                            else
                                return '0';
                        };
                        console.log(URL);
                        order = '-1';
                        console.log('nightmare create');
                        return [4 /*yield*/, this.nightmare
                                .goto(URL)
                                .wait('#product-info')
                                .evaluate(function () { return document.querySelector('#product-info').innerHTML; })
                                .then(function (response) {
                                order = getData(response);
                            }).catch(function (err) {
                                console.log('Fail search', err);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, order];
                }
            });
        });
    };
    Scrap.prototype.is_stock = function (URL) {
        return __awaiter(this, void 0, void 0, function () {
            var checkData, waitSelectore, is_exist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        checkData = function (html) {
                            var $ = cheerio_1.default.load(html);
                            // console.log(html);
                            var page404 = $('.page404-express');
                            if (page404 && page404.text().length > 0) {
                                console.log("page404", page404.text());
                            }
                            else {
                                var shop = $('#shop-header-container');
                                if (shop) {
                                    console.log("Add new shop", shop.text());
                                    return true;
                                }
                            }
                            return false;
                        };
                        waitSelectore = ".main-content";
                        console.log(URL);
                        is_exist = false;
                        // let NGmare: any = Nightmare({ show: false });
                        return [4 /*yield*/, this.nightmare
                                .goto(URL)
                                .wait(waitSelectore)
                                .evaluate(function () { return document.querySelector(".main-content").innerHTML; })
                                .then(function (response) {
                                is_exist = checkData(response);
                            }).catch(function (err) {
                                console.log('Fail search', err);
                            })];
                    case 1:
                        // let NGmare: any = Nightmare({ show: false });
                        _a.sent();
                        // this.nightmare.end();
                        return [2 /*return*/, is_exist];
                }
            });
        });
    };
    Scrap.prototype.NGscroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prevHeight, curHeight;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Scroll all');
                        prevHeight = -1, curHeight = 0;
                        _a.label = 1;
                    case 1:
                        if (!(prevHeight !== curHeight)) return [3 /*break*/, 4];
                        prevHeight = curHeight;
                        return [4 /*yield*/, this.nightmare.evaluate(function () {
                                return document.querySelector('footer').offsetTop;
                            }).then(function (height) {
                                curHeight = height;
                            }).catch(function (err) { return console.log('Some err', err); })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.nightmare.scrollTo(curHeight, 0)
                                .wait(1000)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.nightmare.scrollTo(0, 0)
                            .wait(1000)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Scrap.prototype.getData = function (html) {
        var goodMap = new Map();
        var data = [];
        var $ = cheerio_1.default.load(html);
        var cardsCount = $('.products-list').children();
        var cardLink = $('.card-express');
        $('.card-info-block').each(function (i, elem) {
            var link = $(elem).parent().parent().attr('href');
            var title = $(elem).children('.subtitle').text();
            var stars = $(elem).find('.raiting-wrapper').text().match(/\d.\d+/g);
            var order = $(elem).find('.orders').contents().filter(function (tt) {
                return tt == '1';
            }).text();
            order = order.replace(/\n/g, ' ');
            order = order.match(/\d+/g);
            var price = $(elem).find('.product-card-price').text().match(/\d.\d+/g);
            var old_price = $(elem).find('.product-card-old-price').text().match(/\d.\d+/g);
            var good = new OrderGood(link, parseInt(stars ? stars : 0), parseInt(order ? order : 0), parseInt(price ? price : 0), parseInt(old_price ? old_price : 0), title);
            if (link)
                goodMap.set(link, good);
            // ++commonCards;
        });
        return goodMap;
    };
    Scrap.prototype.findGoods = function () {
        return __awaiter(this, void 0, void 0, function () {
            var goodMap, curHeight, height;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        goodMap = new Map();
                        curHeight = 0;
                        return [4 /*yield*/, this.nightmare.evaluate(function () {
                                return document.querySelector('#shop-products').scrollHeight;
                            }).then(function (height) {
                                curHeight = height;
                            }).catch(function (err) { return console.log('Some err', err); })];
                    case 1:
                        _a.sent();
                        height = 0;
                        _a.label = 2;
                    case 2:
                        if (!(height <= curHeight)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.nightmare
                                .wait('#shop-products')
                                .evaluate(function () { return document.querySelector('#shop-products').innerHTML; })
                                .then(function (response) {
                                goodMap = _this.getData(response);
                            }).catch(function (err) {
                                console.log('Fail search', err);
                            })];
                    case 3:
                        _a.sent();
                        height += 2000;
                        return [4 /*yield*/, this.nightmare.scrollTo(height, 0)
                                .wait(1000)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, goodMap];
                }
            });
        });
    };
    Scrap.prototype.scroll = function (URL) {
        return __awaiter(this, void 0, void 0, function () {
            var waitSelectore, nightmare, goodMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Start scroll scrap by url');
                        waitSelectore = "#shop-products";
                        console.log(URL);
                        nightmare = Nightmare({ show: false, waitTimeout: 4000, height: 3000 });
                        console.log('nightmare create, get store');
                        return [4 /*yield*/, this.nightmare
                                .goto(URL)
                                .wait(waitSelectore)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.NGscroll()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.findGoods()];
                    case 3:
                        goodMap = _a.sent();
                        // await nightmare.end();
                        return [2 /*return*/, goodMap];
                }
            });
        });
    };
    return Scrap;
}());
exports.Scrap = Scrap;
