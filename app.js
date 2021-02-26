let express = require('express');
let app = express();
const sequelize = require('./db') // where database from 

let beer = require('./controllers/beercontroller')
let user = require('./controllers/usercontroller');

sequelize.sync();
// sequelize.sync({ force: true });
app.use(require('./middleware/headers'));


// This will address potential CORS issues. Do not move or modify this code. 
// It must remain under => app.use(require('./middleware/headers'));
app.options('*', (req, res) => {
  res.json({
    status: 'OK'
  });
});



app.use(express.json())

// EXPOSED ROUTES
app.use('/user', user)

// PROTECTED ROUTES
app.use('/beer', beer)


app.listen(3000, function () {
  console.log('App is listening on port 3000')
});

