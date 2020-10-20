const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservation_schema = new Schema({
    duration: {
        type: Number,
        req: true
    },
    date: {
        type: Object,
        req: true
    },
    time: {
        type: Object,
        req: true
    },
    time2: {
        type: Object,
        req: true
    }
});
const reservation_model = mongoose.model('ReservationToMongo', reservation_schema);

module.exports = reservation_model;