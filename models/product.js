module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product' , {
        
    //  id, category, description, image, price, title, amount

    // itemId: {
    //         type: DataTypes.INTEGER,
    //         allowNull: false,
    //     },
        category:{
            type: DataTypes.STRING,
            allowNull: false,   
        },
        title:{
            type: DataTypes.STRING,
            allowNull:true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull:true
        },
        image: {
            type: DataTypes.STRING,
            allowNull:true
        },
        price:{
            type: DataTypes.DOUBLE,
            allowNull:true
        },
        amount:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
    })
    return Product;
}