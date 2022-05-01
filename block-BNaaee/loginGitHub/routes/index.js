var express = require('express');
const passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => res.render('index', { title: 'Express' }));

router.get( '/success', ( req, res ) =>{ 
  // console.log( req. );
  res.render( 'success' )
});

router.get( '/failure', ( req, res ) => res.render( 'failure' ) );

router.get( '/auth/github', passport.authenticate( 'github', { scope: [ 'user:email' ] } ) );

router.get( '/auth/github/callback', passport.authenticate( 'github',
    { failureRedirect: '/failure', session: false }   
  ), ( req, res ) => {
    res.redirect( '/success' ) ;
  } ) ;



module.exports = router;
