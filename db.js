const Sequelize = require('sequelize');

const sequelize = new Sequelize('journal-walkthrough', 'postgres', 'YOUR_PASSWORD_HERE', {
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

