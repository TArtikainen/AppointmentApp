const shoppinglist_model = require('../models/shoppinglist_model');
const product_model = require('../models/product_model');
const shoppinglist_views = require('../views/shoppinglist_views');

const get_shoppinglists = (req, res, next) => {
    const user = req.user;

    user.populate('ShoppingLists').execPopulate().then(() => {
        let data = {
            user_name: user.name,
            shoppinglists: user.ShoppingLists
        };
        let html = shoppinglist_views.shoppinglists_view(data);
        res.send(html);
    });
};

const get_shoppinglist = (req, res, next) => {
    const shoppinglist_id = req.params.id;
    shoppinglist_model.findOne({
        _id: shoppinglist_id
    }).then((shoppinglist) => {
        shoppinglist.populate('products').execPopulate().then(() => {
            let data = {
                shoppinglist_name: shoppinglist.name,
                products: shoppinglist.products,
                shoppinglist_id: shoppinglist._id
            };
            let html = shoppinglist_views.shoppinglist_view(data);
            res.send(html);
        });
    });
};

const post_add_shoppinglist = (req, res, next) => {
    const user = req.user;

    let new_shoppinglist = shoppinglist_model({
        name: req.body.shoppinglist,
        products: []
    });

    new_shoppinglist.save().then(() => {
        user.ShoppingLists.push(new_shoppinglist);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};

const post_delete_shoppinglist = (req, res, next) => {
    const user = req.user;
    const shoppinglist_id_to_delete = req.body.shoppinglist_id;
    const updated_shoppinglist = user.ShoppingLists.filter((shoppinglist_id) => {
        return shoppinglist_id != shoppinglist_id_to_delete;
    });
    user.ShoppingLists = updated_shoppinglist;

    user.save().then(() => {
        shoppinglist_model.findById(shoppinglist_id_to_delete).then((shoppinglist) => {
            shoppinglist.populate('products').execPopulate().then(() => {
                shoppinglist.products.forEach((product) => {
                product_model.findByIdAndDelete(product._id).then(() => {
                console.log('Shoppinglist products deleted');
                    });
                });
            });
        });

        shoppinglist_model.findByIdAndDelete(shoppinglist_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const post_add_product = (req, res, next) => {
    const shoppinglist_id = req.params.id;
    shoppinglist_model.findOne({
        _id: shoppinglist_id
    }).then((shoppinglist) => {
        
        let new_product = product_model({
            name: req.body.product_name,
            quantity: req.body.product_quantity,
            date: req.body.product_date 
            
        });

        new_product.save().then(() => {
            shoppinglist.products.push(new_product);
            shoppinglist.save().then(() => {
                return res.redirect(`/shoppinglist/${shoppinglist._id}`);
            });
        });
    });
};

const post_delete_product = (req, res, next) => {
    const user = req.user;
    const product_id_to_delete = req.body.product_id;
    const shoppinglist_id = req.body.shoppinglist_id;

    product_model.findByIdAndDelete(product_id_to_delete).then(() => {
        res.redirect(`/shoppinglist/${shoppinglist_id}`);
    });

};

module.exports.get_shoppinglists = get_shoppinglists;
module.exports.get_shoppinglist = get_shoppinglist;
module.exports.post_add_product = post_add_product;
module.exports.post_add_shoppinglist = post_add_shoppinglist;
module.exports.post_delete_shoppinglist = post_delete_shoppinglist;
module.exports.post_delete_product = post_delete_product;