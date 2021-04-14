require("dotenv").config();
let express = require('express');
let app = express();
const sequelize = require('./db'); // where database from
let cors = require('cors');


let product = require('./controllers/productcontroller');
let user = require('./controllers/usercontroller');
let review = require('./controllers/productreviewcontroller');
let userproduct = require('./models/userProduct');

async function getUsers() {
  let url = 'users.json';
  try {
      let res = await fetch('https://fakestoreapi.com/productsl');
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}
// async function renderUsers() {
//   let users = await getUsers();
//   let html = '';
//   users.forEach(user => {
//       let htmlSegment = `<div class="user">
//                           <img src="${user.profileURL}" >
//                           <h2>${user.firstName} ${user.lastName}</h2>
//                           <div class="email"><a href="email:${user.email}">${user.email}</a></div>
//                       </div>`;

//       html += htmlSegment;
//   });

//   let container = document.querySelector('.container');
//   container.innerHTML = html;
// }

// renderUsers();
sequelize.sync();
// sequelize.sync({ force: true }):
app.use(require('./middleware/headers'));

// enable CORS using npm package
app.use(cors());


app.use(express.json())

// EXPOSED ROUTES
app.use('/user', user)

// PROTECTED ROUTES
app.use('/product', product)
app.use('/review', review)
app.use('/userproduct', userproduct)


// app.listen(process.env.PORT, () => {
//   console.log(`server is listening on port ${process.env.PORT}`)

app.listen(3000, function () {
  console.log('App is listening on port 3000')
})
