const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('review' ,  {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        entry: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Review;
};

