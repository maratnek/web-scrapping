"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Good = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var orderSchema = new Schema({
    order: { type: Number, required: true },
    stars: { type: Number, required: false },
    req_count: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});
var goodSchema = new Schema({
    stock_id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    // link: {
    //     type: String,
    //     required: true,
    // },
    title: {
        type: String,
        // required: true,
    },
    // stock: {
    //     type: String,
    // },
    order_date: {
        type: [orderSchema],
        // required: true,
    },
}, { timestamps: true });
exports.Good = mongoose_1.default.model('Goods', goodSchema);
// export Good;
// module.exports = Good;
