var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Peliculas IUD' });
});

module.exports = router;
// https://github.com/dcortesnet/Nodejs-express-mongoose-mongodb/blob/master/index.js
// https://www.digitalocean.com/community/tutorials/how-to-integrate-mongodb-with-your-node-application-es