let express = require('express');
let app = express();
const sequelize = require('./db') // where database from
let cors = require('cors');
require("dotenv").config();

let beer = require('./controllers/beercontroller')
let user = require('./controllers/usercontroller');

sequelize.sync();
 //sequelize.sync({ force: true });
app.use(require('./middleware/headers'));

// enable CORS using npm package
app.use(cors());


app.use(express.json())

// EXPOSED ROUTES
app.use('/user', user)

// PROTECTED ROUTES
app.use('/beer', beer)


app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`)
})
