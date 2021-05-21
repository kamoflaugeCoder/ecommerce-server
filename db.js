// 1
const Sequelize = require('sequelize');

//2                     //3           //4         /5          //6

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect        : 'postgres',
	dialectOptions : !process.env.DATABASE_URL.includes('localhost')
		? {
				ssl : {
					require            : true,
					rejectUnauthorized : false // <<<<<<< YOU NEED THIS TO FIX UNHANDLED REJECTION
				}
			}
		: {}
});

//9            //10        //11
sequelize.authenticate().then(() => {
	console.log('Ecommerce server connected');
}),
	function(err) {
		console.log(err);
	};

User = sequelize.import('./models/user');
Review = sequelize.import('./models/review');
Product = sequelize.import('./models/product');
Cart = sequelize.import('./models/cart');

Review.belongsTo(Product);
Product.hasMany(Review);

User.hasMany(Product);
Product.belongsTo(User);

// .catch(err => {
//     console.error('Unable to connect to the database:', err);
// });
//14
module.exports = sequelize;
