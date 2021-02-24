module.exports = (sequelize, DataTypes) => {

    const Beer = sequelize.define('beer', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,

        },

        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
          type: DataTypes.STRING, 
            allowNull: false,
        },

        comments: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    })

 return Beer;
};

