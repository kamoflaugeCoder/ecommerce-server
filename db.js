const Sequelize = require('sequelize');
require("dotenv").config()


const sequelize = new Sequelize('Wing-DB', 'postgres', process.env.MY_PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
   
    function() {
        console.log('Connected ');
    },

    function(err){
        console.log(err);
    }
);

module.exports = sequelize; 

