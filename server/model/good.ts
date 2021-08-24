import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema =  new Schema ({
    order: {type: Number, required: true},
    stars: {type: Number, required: false},
    price: {type: Number, required: true},
    old_price: {type: Number, required: false},
    req_count: {type: Number, required: true},
    date: {type: Date, default: Date.now}
})

const goodSchema = new Schema({
    stock_id: {
        type: String,
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

    
}, {timestamps: true})

export const Good = mongoose.model('Goods', goodSchema);

// export Good;
// module.exports = Good;