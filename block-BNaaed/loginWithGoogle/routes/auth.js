var router = require( 'express' ).Router();
var passport = require( 'passport' );

//* @desc    Auth with Google
//* @route   GET /auth/google
router.get( '/google', passport.authenticate( 'google', { scope: [ "profile" ] } ) );

//* @desc    Google auth callback
//* @route   GET /auth/google/callback
router.get( 
    '/google/callback',
    passport.authenticate( 'google', { failureRedirect: '/auth/failure' } ),
    ( req, res ) => {
        res.redirect( '/auth/success' )
    }
    )

//* @desc    Logout User
//* @route   GET /auth/logout
router.get( '/logout', ( req, res, next ) => {
    req.logout();
    res.redirect('/users/login');
} )

module.exports = router;