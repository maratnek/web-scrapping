"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvStream = exports.CsvHandler = void 0;
var Service = __importStar(require("./scrap-service"));
var Fastify = __importStar(require("./test"));
var CsvHandler = /** @class */ (function () {
    function CsvHandler() {
    }
    CsvHandler.prototype.handler = function (stream) {
        //getOrderByUrl(stream);
        console.log(Fastify.maxThing);
        console.log(Fastify.getArrayLength(['car', 'Bar']));
        var url = "http://google.com";
        console.log(Service.getOrderByUrl(url));
        console.log('handle', stream);
    };
    return CsvHandler;
}());
exports.CsvHandler = CsvHandler;
;
var stream_1 = __importDefault(require("stream"));
var CsvStream = /** @class */ (function (_super) {
    __extends(CsvStream, _super);
    function CsvStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CsvStream;
}(stream_1.default.Readable));
exports.CsvStream = CsvStream;
