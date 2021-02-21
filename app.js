let express = require('express');
let app = express();
let user = require('./controllers/user');

app.listen(3000, function(){
    
});

app.use('/user', user);