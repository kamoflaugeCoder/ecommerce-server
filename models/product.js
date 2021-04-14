module.exports = function (sequelize, DataTypes) {
    const Product = sequelize.define('product' , {
        
    //  id, category, description, image, price, title, amount

    itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category:{
            type: DataTypes.STRING,
            allowNull: false,   
        },
        description: {
            type: DataTypes.STRING,
            allowNull:true
        },
        image: {
            type: DataTypes.STRING,
            allowNull:true
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        title:{
            type: DataTypes.TEXT,
            allowNull:true
        },
        amount:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
    })
    return Product;
}