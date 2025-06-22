import { Schema,model } from "mongoose";
import normalize from "normalize-mongoose"


const advertSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category:{
        type: String,
        required: true
    },

    images: {
        type: [String],
        default: []

    },

    vendor:{
        type: Schema.Types.ObjectId, ref:"User"
    },
},{timestamps: true});

advertSchema.plugin(normalize)

export const Advert = model('Advert',advertSchema);