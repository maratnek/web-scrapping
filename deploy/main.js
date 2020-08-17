"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
// Create a new express app instance
var app = express();
// set static folder
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
var EventEmitter = require('events');
var Stream = new EventEmitter(); // my event emitter instance
// app.get('/events2', function(request, response){
//   response.writeHead(200, {
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache',
//     'Connection': 'keep-alive'
//   });
//   Stream.on("push", function(event : any, data : any) {
//     response.write("event: " + String(event) + "\n" + "data: " + JSON.stringify(data) + "\n\n");
//   });
// });
// setInterval(function(){
//   Stream.emit("push", "test", { msg: "admit one" });
// }, 10000)
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
                console.log('push data');
                //res.write("event: " + String(event) + "\n" + "data: " + JSON.stringify(data) + "\n\n");
                res.write("data: " + JSON.stringify(data) + "\n\n");
            });
            return [2 /*return*/];
        });
    });
});
;
var Service = __importStar(require("./scrap-service"));
var csv = require("csv-parser");
var csvData = [];
app.post('/scrap-service', function (req, res) {
    console.log('scrap-service');
    var CSV = csv({ separator: ';' });
    CSV.on('data', function (d) {
        console.log('data csv', d);
        if (d.URL)
            csvData.push(d);
    });
    CSV.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
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
                    return [4 /*yield*/, Service.getOrderByUrl(itCsv.URL)];
                case 2:
                    _a.Orders = _b.sent();
                    console.log(itCsv);
                    Stream.emit("push", "test", itCsv);
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, Service.writeCsvData(csvData)];
                case 5:
                    _b.sent();
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
// const multer = require('multer');
// const csv = require('fast-csv');
// const router = express.Router();
// const upload = multer({dest: './tmp/csv/'});
// router.post('/scrap-service', upload.single('file'), function (req, res, next) {
//     var fileRows = [], fileHeader;
//     // open uploaded file
//     csv.fromPath(req.file.path)
//       .on("data", function (data:any) {
//         fileRows.push(data); // push each row
//       })
//       .on("end", function () {
//         fs.unlinkSync(req.file.path);   // remove temp file
//         //process "fileRows"
//       });
//   });
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { return console.log("App is listening on port " + PORT + "!"); });
