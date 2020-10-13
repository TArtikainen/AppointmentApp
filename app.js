const express = require('express');
const PORT = process.env.PORT || 8080;
const body_parser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

// Controllers
const auth_controller = require('./controllers/auth_controller');
const shoppinglist_controller = require('./controllers/shoppinglist_controller');

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

// Shoppinglists
app.get('/', is_logged_handler, shoppinglist_controller.get_shoppinglists);
app.get('/shoppinglist/:id', is_logged_handler, shoppinglist_controller.get_shoppinglist);
app.post('/add-product/:id', is_logged_handler, shoppinglist_controller.post_add_product);
app.post('/add-shoppinglist', is_logged_handler, shoppinglist_controller.post_add_shoppinglist);
app.post('/delete-shoppinglist', is_logged_handler, shoppinglist_controller.post_delete_shoppinglist);
app.post('/shoppinglist/delete-product', is_logged_handler, shoppinglist_controller.post_delete_product);

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