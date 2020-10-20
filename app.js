const express = require('express');
const PORT = process.env.PORT || 8080;
const body_parser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

// Controllers
const auth_controller = require('./controllers/auth_controller');
const reservation_controller = require('./controllers/reservation_controller');

let app = express();

app.use(body_parser.urlencoded({
    extended: true
}));

app.use(session({
    secret: '1234qwerty',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000
    }
}));

app.use('/css', express.static('css'))

app.use((req, res, next) => {
    console.log('PATH: ' + req.path + " METHOD: " + req.method);
    next();
});

const is_logged_handler = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

// Auth
app.use(auth_controller.handle_user);
app.get('/login', auth_controller.get_login);
app.post('/logout', auth_controller.post_logout);
app.post('/login', auth_controller.post_login);
app.post('/register', auth_controller.post_register);

// Reservations
app.get('/', is_logged_handler, reservation_controller.get_reservations);
app.post('/add-reservation', is_logged_handler, reservation_controller.post_add_reservation);
app.post('/delete-reservation', is_logged_handler, reservation_controller.post_delete_reservation);

app.use((req, res, next) => {
    res.status(404);
    res.send(`
        page not found
    `);
});

const mongoose_url = 'mongodb+srv://dbUser:QHs2sIQYe6uW8oCW@cluster0.3lrj3.mongodb.net/Test?retryWrites=true&w=majority';
mongoose.connect(mongoose_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Mongoose connected');
    console.log('Starting Express server');
    app.listen(PORT);
});