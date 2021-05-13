"use strict";
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
var csv = require('csv-parser');
var fs = require('fs');
var createCsvWriter = require('csv-writer').createObjectCsvWriter;
var Nightmare = require('nightmare');
var cheerio = require('cheerio');
var getOrderByUrl = function (URL) { return __awaiter(void 0, void 0, void 0, function () {
    var getData, nightmare, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                getData = function (html) {
                    // console.log('html', html)
                    data = [];
                    var $ = cheerio.load(html);
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
                nightmare = Nightmare({ show: false });
                order = '-1';
                console.log('nightmare create');
                return [4 /*yield*/, nightmare
                        .goto(URL)
                        .wait('#product-info')
                        .evaluate(function () { return document.querySelector('#product-info').innerHTML; })
                        .end()
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
}); };
var getStoreByUrl = function (URL) { return __awaiter(void 0, void 0, void 0, function () {
    function scroll() {
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
                        return [4 /*yield*/, nightmare.evaluate(function () {
                                return document.querySelector('#shop-products').scrollHeight;
                                // return document.querySelector('footer').offsetTop;
                            })
                                .then(function (height) {
                                curHeight = height;
                                console.log('HeighT: ', height);
                                console.log('diff: ', height - prevHeight);
                            })
                                .catch(function (err) { return console.log('Some err', err); })];
                    case 2:
                        _a.sent();
                        console.log('current HeighT: ', curHeight);
                        return [4 /*yield*/, nightmare.scrollTo(curHeight, 0)
                                .wait(2000)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 4:
                        console.log('Scroll to 0');
                        return [4 /*yield*/, nightmare.scrollTo(0, 0)
                                .wait(1000)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function findGoods() {
        return __awaiter(this, void 0, void 0, function () {
            var curHeight, height;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        curHeight = 0;
                        return [4 /*yield*/, nightmare.evaluate(function () {
                                return document.querySelector('#shop-products').scrollHeight;
                            })
                                .then(function (height) {
                                curHeight = height;
                                console.log('HeighT: ', height);
                            })
                                .catch(function (err) { return console.log('Some err', err); })];
                    case 1:
                        _a.sent();
                        height = 0;
                        _a.label = 2;
                    case 2:
                        if (!(height <= curHeight)) return [3 /*break*/, 5];
                        return [4 /*yield*/, nightmare
                                .wait('#shop-products')
                                .evaluate(function () { return document.querySelector('#shop-products').innerHTML; })
                                .then(function (response) {
                                // console.log('Responce ', response);
                                order = getData(response);
                            }).catch(function (err) {
                                console.log('Fail search', err);
                            })];
                    case 3:
                        _a.sent();
                        height += 2000;
                        console.log('current HeighT: ', height);
                        return [4 /*yield*/, nightmare.scrollTo(height, 0)
                                .wait(1000)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function findVer1() {
        return __awaiter(this, void 0, void 0, function () {
            var prevHeight, curHeight;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('find ver 1');
                        prevHeight = -1, curHeight = 0;
                        _a.label = 1;
                    case 1:
                        if (!(prevHeight !== curHeight)) return [3 /*break*/, 5];
                        prevHeight = curHeight;
                        return [4 /*yield*/, nightmare.evaluate(function () {
                                return document.querySelector('#shop-products').scrollHeight;
                            })
                                .then(function (height) {
                                curHeight = height;
                                console.log('HeighT: ', height);
                                console.log('diff: ', height - prevHeight);
                            })
                                .catch(function (err) { return console.log('Some err', err); })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, nightmare
                                .wait('#shop-products')
                                .evaluate(function () { return document.querySelector('#shop-products').innerHTML; })
                                .then(function (response) {
                                // console.log('Responce ', response);
                                order = getData(response);
                            }).catch(function (err) {
                                console.log('Fail search', err);
                            })];
                    case 3:
                        _a.sent();
                        console.log('current HeighT: ', curHeight);
                        return [4 /*yield*/, nightmare.scrollTo(curHeight, 0)
                                .wait(1000)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    var commonCards, goodMap, getData, waitSelectore, nightmare, order, _i, goodMap_1, it;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                commonCards = 0;
                goodMap = new Map;
                getData = function (html) {
                    data = [];
                    var $ = cheerio.load(html);
                    var cardsCount = $('.products-list').children();
                    console.log('Cards count: ', cardsCount.length);
                    var cardLink = $('.card-express');
                    var cardsBlock = $('.card-info-block');
                    cardsBlock.each(function (i, elem) {
                        var link = $(this).parent().parent().attr('href');
                        var title = $(this).children('.subtitle').text();
                        var stars = $(this).find('.raiting-wrapper').text();
                        // stars = stars.replace(/\n/g, ' ');
                        stars = stars.match(/\d.\d+/g);
                        var order = $(this).find('.orders').contents().filter(function () {
                            return this.nodeType == 3;
                        }).text();
                        order = order.replace(/\n/g, ' ');
                        order = order.match(/\d+/g);
                        console.log("Cards info: " + i + " card dummy: " + title);
                        console.log("Cards info: " + i + " card dummy: " + order);
                        console.log("Cards info: stars: " + stars);
                        console.log("link: " + link);
                        if (link)
                            goodMap.set(link, { stars: stars, order: order, title: title });
                    });
                    commonCards += cardsBlock.length;
                };
                waitSelectore = '#shop-products';
                console.log(URL);
                nightmare = Nightmare({ show: false, waitTimeout: 4000, height: 1200 });
                order = '-1';
                console.log('nightmare create, get store');
                return [4 /*yield*/, nightmare
                        .goto(URL)
                        .wait('#shop-products')];
            case 1:
                _a.sent();
                return [4 /*yield*/, scroll()];
            case 2:
                _a.sent();
                return [4 /*yield*/, findGoods()];
            case 3:
                _a.sent();
                return [4 /*yield*/, nightmare.end()];
            case 4:
                _a.sent();
                for (_i = 0, goodMap_1 = goodMap; _i < goodMap_1.length; _i++) {
                    it = goodMap_1[_i];
                    console.log('Map it: ', it);
                }
                console.log('Good map length:', goodMap.size);
                console.log('Common cards length: ', commonCards);
                return [2 /*return*/, order];
        }
    });
}); };
var csvData = [];
var writeCsvData = function (csv_data) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, csvWriter;
    return __generator(this, function (_a) {
        fileName = "output/kznexpress-out-" + Date.now() + ".csv";
        fs.writeFileSync(fileName, '');
        csvWriter = createCsvWriter({
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
}); };
var startThisModule = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fs.createReadStream('kznexpress.csv')
            .pipe(csv({ separator: ';' }))
            .on('data', function (row) {
            csvData.push(row);
        })
            .on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _i, csvData_1, itCsv, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('CSV file successfully processed');
                        _i = 0, csvData_1 = csvData;
                        _b.label = 1;
                    case 1:
                        if (!(_i < csvData_1.length)) return [3 /*break*/, 4];
                        itCsv = csvData_1[_i];
                        _a = itCsv;
                        return [4 /*yield*/, getOrderByUrl(itCsv.URL)];
                    case 2:
                        _a.Orders = _b.sent();
                        console.log(itCsv);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        writeCsvData(csvData);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
var getCsvStream = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, csv({ separator: ';' })];
    });
}); };
// getOrderByUrl('https://kazanexpress.ru/product/221974');
// getStoreByUrl('https://kazanexpress.ru/alistore');
// getStoreByUrl('https://kazanexpress.ru/pichee');
// getStoreByUrl('https://kazanexpress.ru/seletstore');
module.exports = {
    getOrderByUrl: getOrderByUrl,
    getCsvStream: getCsvStream,
    writeCsvData: writeCsvData,
    getStoreByUrl: getStoreByUrl,
    csv: csv
};
