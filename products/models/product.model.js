const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let productSchema = new Schema({
    product:{
        type: String,
        required: [true, 'Product is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
    },
    cost: {
        type: Number,
        required: [true, 'Cost is required field'],
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Description is required field'],
        max: 100,
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required field'],
        trim: true,
        lowercase: true
    },
},
{
    collection: 'products',
    timestamps: true
});

productSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Product', productSchema)