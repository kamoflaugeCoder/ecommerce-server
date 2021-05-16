module.exports = (sequelize, DataTypes) => {

    const Cart = sequelize.define('cart' , {

        userId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        // subtotal:{
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },
    })
    
// User.belongsToMany(Product, {through: userProduct});
// Product.belongsToMany(User , {through: userProduct});

    return Cart;
};