"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Good schema
var GoodSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
var GoodModel = mongoose_1.model("Good", GoodSchema);
exports.default = GoodModel;
