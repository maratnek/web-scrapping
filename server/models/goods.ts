import {model, Document, Schema, Model} from 'mongoose';

export interface IGood extends Document {
    id: number;
    url: string;
    count: number;
    date: Date;
}

// Good schema
const GoodSchema : Schema = new Schema({
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
})

const GoodModel: Model<IGood> = model("Good", GoodSchema)

export default GoodModel;