var express = require('express');
var router = express.Router();
const { ensureAuth, ensureGuest } = require( '../middlewares/auth' )

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//* desc        Login Page 
//* route       GET /login
router.get( '/login', ensureGuest, ( req, res, next ) => {
  res.render('users/login');
} )

module.exports = router;
