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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.addGood = void 0;
// connect to db and use models
var mongoose_1 = __importDefault(require("mongoose"));
var good_js_1 = require("./model/good.js");
var dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/.env' });
// Warning use env for it
var dbUser = 'zm-first';
var dbPassword = process.env.PASSWORD;
var dbName = 'firstCluster';
var dbURI = "mongodb+srv://" + dbUser + ":" + dbPassword + "@firstcluster.kd6iy.mongodb.net/" + dbName + "?retryWrites=true&w=majority";
console.log('Password ', dbPassword, dbURI);
var showAllGoods = function () {
    good_js_1.Good.find({})
        .then(function (result) {
        console.log(result);
    }).catch(function (err) { console.log(err); });
};
// let insertData = () => {
//     const good = new Good({ index: 777, name: "beatyfull" })
//     good.save()
//         .then((result) => {
//             console.log(result);
//         })
//         .catch((err) => console.log(err));
// }
var delByName = function (_name) {
    good_js_1.Good.deleteMany({ name: _name })
        .then(function (result) {
        console.log("DELETED", result);
    })
        .catch(function (err) { return console.log(err); });
};
// let createOrUpdate = (body) => {
//     Good.findOneAndUpdate({ name: body.name }, { index: body.index }, { upsert: true }, (err, res) => {
//         // if (!err) {
//         //     if (!res) {
//         //         console.log("create document")
//         //         res = new Good(body);
//         //     }
//         //     res.save((err) => {
//         //         if (!err) {
//         //             console.log("saving")
//         //         } else {
//         //             throw err;
//         //         }
//         //     })
//         // }
//     })
// }
var addGood = function (prepared_good) {
    console.log('Prepared good', prepared_good);
    good_js_1.Good.findOne({ name: prepared_good[1].name }).then(function (good) {
        if (!good)
            throw good;
        console.log("Find: ", good);
        if (good.order_date === undefined) {
            var child = { order: prepared_good[1].order, stars: prepared_good[1].stars, req_count: 0 };
            good.order_date = [child];
        }
        else {
            var last_child = good.order_date[good.order_date.length - 1];
            var child2 = { order: prepared_good[1].order, stars: prepared_good[1].stars, req_count: good.order_date.length };
            // let date = good.children[0].date;
            // console.log("time: ", date.getHours(), date.getMinutes(), date.getSeconds());
            if (last_child.order < child2.order) {
                good.order_date.push(child2);
            }
        }
        console.log("Prepared: ", good);
        good_js_1.Good.findOneAndUpdate({ name: good.name }, good, { upsert: true }, function (err, res) {
            if (err) {
                console.log("Error findOneAndUpdate", err);
            }
            if (res) {
                console.log("Success findOneAndUpdate", res);
            }
        });
    }).catch(function (err) {
        // console.log(err);
        var good = new good_js_1.Good(prepared_good[1]);
        var child = { order: prepared_good[1].order, stars: prepared_good[1].stars, req_count: 0 };
        good.order_date.push(child);
        // if (prepared_good[1].order_date !== undefined) {
        // }
        console.log("Try to save", good);
        // Good.findOneAndUpdate({ name: good.name },
        //     good, { upsert: true }, (err, res) => {
        //         if (err) { console.log("Error findOneAndUpdate",err); }
        //         if (res) { console.log("Success findOneAndUpdate",res); }
        //     });
        good.save()
            .then(function (result) {
            console.log(result);
        })
            .catch(function (err) { return console.log("saving:  ", err); });
    });
};
exports.addGood = addGood;
// connect to mongodb
var connect = function (callback) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })];
            case 1:
                res = _a.sent();
                if (!res) {
                    return [2 /*return*/];
                }
                console.log('Connect to DB!');
                callback();
                return [2 /*return*/];
        }
    });
}); };
exports.connect = connect;
// .then((result) => {
//     // delByName('beatyfull');
//     showAllGoods();
// })
// .catch((err) => console.log(err));
