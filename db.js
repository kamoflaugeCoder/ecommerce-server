// 1
const Sequelize = require('sequelize');
// const userInfo = require('./userInfo');

//2                     //3           //4         /5          //6
const sequelize = new Sequelize('ecommerce', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

//9            //10        //11
sequelize.authenticate().then(() => {
        console.log('Ecommerce server connected');
    }),

    function (err){
            console.log(err)
    }

    User = sequelize.import('./models/user');
    Review = sequelize.import('./models/review');
    Product = sequelize.import('./models/product'),
    UserProduct = sequelize.import('./models/userProduct'),


    Review.belongsTo(User);
    User.hasMany(Review);
    // UserInfo.belongsTo(User);

    User.hasMany(Product);
    Product.belongsTo(User);

    // .catch(err => {
    //     console.error('Unable to connect to the database:', err);
    // });
//14
module.exports = sequelize;
