var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // var reactHtml = React.renderToString(ReactApp({}));
  res.render('index', { 
      title: 'AppleTea'
  });
});

module.exports = router;
