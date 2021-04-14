const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const UserProduct = require('./userProduct')


User. hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Product);
Product.belongsToMany(User , {through: UserProduct});

module.exports = {
    User,
    Product,
    Review,
    UserProduct
}