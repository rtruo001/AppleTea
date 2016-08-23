var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  // var reactHtml = React.renderToString(ReactApp({}));
  res.render('Login', { 
    titie: 'AppleTea'
  }); 
});

router.post('/',
  passport.authenticate('local-login', { 
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

// router.post('/', 
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   })
// );

module.exports = router;
