let express = require('express')
let router = express.Router();


router.post('/register', function (req, res) {
    res.send('POST request to Beer Wingman for register endpoint');
  });

  router.post('/login', function (req, res) {
    res.send('POST request to Beer Wingman for login endpoint');
  });
module.exports = router;