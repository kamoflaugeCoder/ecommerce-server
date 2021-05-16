

const User = require('./user');
const Product = require('./product');
const Review = require('./review');
const Cart = require('./cart');

const db = require('../db');

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Product);
Product.belongsToMany(User , {through: Cart});

module.exports = {
    User,
    Product,
    Review,
    Cart
};

