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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var csv = require("csv-parser");
// import { json } from 'body-parser';
var service_js_1 = require("./service.js");
var db_js_1 = require("./db.js");
var scrap = new service_js_1.Scrap();
var scrapStocks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var index, is_stock, goodMap, goodMap_1, goodMap_1_1, pair, e_1;
    var e_2, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("Start scrap");
                index = Number(process.env.COUNT) || 0;
                _b.label = 1;
            case 1:
                if (!(index != 100000)) return [3 /*break*/, 8];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 6, , 7]);
                return [4 /*yield*/, scrap.is_stock("https://kazanexpress.ru/" + index)];
            case 3:
                is_stock = _b.sent();
                console.log("Index: " + index + " It's " + (is_stock ? "" : "not") + " stock");
                if (!is_stock) return [3 /*break*/, 5];
                return [4 /*yield*/, scrap.scroll("https://kazanexpress.ru/" + index)];
            case 4:
                goodMap = _b.sent();
                try {
                    for (goodMap_1 = (e_2 = void 0, __values(goodMap)), goodMap_1_1 = goodMap_1.next(); !goodMap_1_1.done; goodMap_1_1 = goodMap_1.next()) {
                        pair = goodMap_1_1.value;
                        pair[1].stock_id = index.toString();
                        db_js_1.addGood(pair);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (goodMap_1_1 && !goodMap_1_1.done && (_a = goodMap_1.return)) _a.call(goodMap_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                e_1 = _b.sent();
                console.log("Somethisn wrong. Try next ", e_1);
                return [3 /*break*/, 7];
            case 7:
                index++;
                return [3 /*break*/, 1];
            case 8: return [2 /*return*/];
        }
    });
}); };
var findAllStocks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var index, is_stock, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Find all stocks");
                index = 995;
                _a.label = 1;
            case 1:
                if (!(index != 2000)) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, scrap.is_stock("https://kazanexpress.ru/" + index)];
            case 3:
                is_stock = _a.sent();
                console.log("Index: " + index + " It's " + (is_stock ? "" : "not") + " stock");
                return [3 /*break*/, 5];
            case 4:
                e_3 = _a.sent();
                console.log("Somethisn wrong. Try next ", e_3);
                return [3 /*break*/, 5];
            case 5:
                index++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
// findAllStocks();
db_js_1.connect(function () { return __awaiter(void 0, void 0, void 0, function () {
    var index, goodMap, goodMap_2, goodMap_2_1, pair;
    var e_4, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                index = 'mastera';
                return [4 /*yield*/, scrap.scroll("https://kazanexpress.ru/" + index)];
            case 1:
                goodMap = _b.sent();
                try {
                    for (goodMap_2 = __values(goodMap), goodMap_2_1 = goodMap_2.next(); !goodMap_2_1.done; goodMap_2_1 = goodMap_2.next()) {
                        pair = goodMap_2_1.value;
                        pair[1].stock_id = index;
                        db_js_1.addGood(pair);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (goodMap_2_1 && !goodMap_2_1.done && (_a = goodMap_2.return)) _a.call(goodMap_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                return [2 /*return*/];
        }
    });
}); });
// Create a new express app instance
var app = express();
// set static folder
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.json());
var EventEmitter = require('events');
var Stream = new EventEmitter(); // my event emitter instance
app.get('/events', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            console.log('Got /events');
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive'
            });
            res.flushHeaders();
            // Tell the client to retry every 10 seconds if connectivity is lost
            res.write('retry: 10000\n\n');
            count = 0;
            Stream.on("push", function (event, data) {
                //console.log('push data');
                //res.write("event: " + String(event) + "\n" + "data: " + JSON.stringify(data) + "\n\n");
                res.write("data: " + JSON.stringify(data) + "\n\n");
            });
            return [2 /*return*/];
        });
    });
});
;
// parse application/json
app.get('/stock-goods', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(req.url);
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive'
            });
            res.flushHeaders();
            if (req.query && req.query.reqStockName)
                res.write("req stock name " + req.query.reqStockName);
            return [2 /*return*/];
        });
    });
});
;
app.post('/scrap-service', function (req, res) {
    console.log('scrap-service');
    var csvData = [];
    var CSV = csv({ separator: ';' });
    CSV.on('data', function (d) {
        console.log('data csv', d);
        if (d.URL)
            csvData.push(d);
    });
    CSV.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
        var csvData_1, csvData_1_1, itCsv, _a, e_5_1;
        var e_5, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('CSV file successfully processed');
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    csvData_1 = __values(csvData), csvData_1_1 = csvData_1.next();
                    _c.label = 2;
                case 2:
                    if (!!csvData_1_1.done) return [3 /*break*/, 5];
                    itCsv = csvData_1_1.value;
                    _a = itCsv;
                    return [4 /*yield*/, scrap.getOrderByUrl(itCsv.URL)];
                case 3:
                    _a.Orders = _c.sent();
                    itCsv.Count = 0; //itCsv.Orders.match(/\d+/g);
                    console.log(itCsv);
                    Stream.emit("push", "test", itCsv);
                    _c.label = 4;
                case 4:
                    csvData_1_1 = csvData_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_5_1 = _c.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (csvData_1_1 && !csvData_1_1.done && (_b = csvData_1.return)) _b.call(csvData_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 8: return [4 /*yield*/, scrap.writeCsvData(csvData)];
                case 9:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    req.pipe(CSV);
    req.on('data', function (d) {
        console.log('data', d.toString());
        res.status(200).end();
    });
    req.on('error', function (err) { return console.error(err); });
    req.on('close', function () {
        console.log('close');
    });
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("App is listening on port https://localhost:" + PORT + "!");
});
