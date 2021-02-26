module.exports = (sequelize, DataTypes) => {

    const Beer = sequelize.define('beer', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        comments: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })

    return Beer;
};

