require("dotenv").config();
let express = require('express');
let app = express();
const sequelize = require('./db'); // where database from
let cors = require('cors');


let product = require('./controllers/productcontroller');
let user = require('./controllers/usercontroller');
let review = require('./controllers/productreviewcontroller');
let cart = require('./controllers/cartcontroller');


  

// renderUsers();
sequelize.sync();
// sequelize.sync({ force: true })
app.use(require('./middleware/headers'));

// enable CORS using npm package
app.use(cors());


app.use(express.json())

// EXPOSED ROUTES
app.use('/user', user)

// PROTECTED ROUTES
app.use('/product', product)
app.use('/review', review)
app.use('/cart', cart)


// app.listen(process.env.PORT, () => {
//   console.log(`server is listening on port ${process.env.PORT}`)

app.listen(process.env.PORT, function () {
  console.log('App is listening')
})
