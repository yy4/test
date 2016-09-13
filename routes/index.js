var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('game.html', { title: 'Express' });
});
router.get('/test',function (req, res) {
  res.render('game.html',{});
})

module.exports = router;
