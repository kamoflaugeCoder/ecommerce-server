require('dotenv') .config()

const Express = require('express')
const app = Express()

const db = require('./db')

const controllers = require('./controllers/usercontroller')

app.use(Express.json())

app.use('/user', controllers.user)
app.use('/product', controllers.product)
app.use('/review', controllers.review)

db.authenticate()
    // .then(() => db.sync({forcr: true}))
    .then(() => db.sync())
        .then(() => {
            app.listen(process.env.PORT, console.log(`[server]: listening on localhost:${process.env.PORT}`))
        })
        .catch(err => {
            console.log('[server]: Server Crashed')
            console.log(err)
        })