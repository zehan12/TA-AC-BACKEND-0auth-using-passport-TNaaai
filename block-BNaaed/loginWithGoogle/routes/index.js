var express = require('express');
var router = express.Router();
const { ensureAuth, ensureGuest } = require( '../middlewares/auth' )

const Blog = require('../models/Blog');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//* desc      Dashboard
//* route     GET /
router.get( '/dashboard', ensureAuth, async ( req, res, next ) => {
  try {
    const blogs = await Blog.find( { user: req.user.id } ).lean();
    res.render( 'dashboard' , { name: req.user.firstName, blogs } );
  } catch ( err ) { 
    return next( err );
  }
} );



module.exports = router;
