const reservation_model = require('../models/reservation_model');
const reservation_views = require('../views/reservation_views');

const get_reservations = (req, res, next) => {
    const user = req.user;

    user.populate('Reservations').execPopulate().then(() => {
        let data = {
            user_name: user.name,
            reservations: user.Reservations
        };
        let html = reservation_views.reservations_view(data);
        res.send(html);
    });
};


const post_add_reservation = (req, res, next) => {
    const user = req.user;

    let new_reservation = reservation_model({
        date: req.body.product_date,
        duration: req.body.product_duration,
        time: req.body.product_time,
        time2: req.body.product_time
    });

    new_reservation.save().then(() => {
        user.Reservations.push(new_reservation);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};

const post_delete_reservation = (req, res, next) => {
    const user = req.user;
    const reservation_id_to_delete = req.body.reservation_id;
    const updated_reservation = user.Reservations.filter((reservation_id) => {
        return reservation_id != reservation_id_to_delete;
    });
    user.Reservations = updated_reservation;

    user.save().then(() => {
        reservation_model.findByIdAndDelete(reservation_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};



module.exports.get_reservations = get_reservations;
module.exports.post_add_reservation = post_add_reservation;
module.exports.post_delete_reservation = post_delete_reservation;