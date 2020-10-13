const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppinglist_schema = new Schema({
    name: {
        type: String,
        req: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductToMongo',
        req: true
    }]
});
const shoppinglist_model = mongoose.model('ShoppinglistToMongo', shoppinglist_schema);

module.exports = shoppinglist_model;