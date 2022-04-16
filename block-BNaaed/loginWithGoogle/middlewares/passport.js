const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require( 'mongoose' );
const passport = require('passport');
const User = require('../models/User');
// require('dotenv').config( { path: './config/config.env' } );

console.log( process.env.GOOGLE_CLIENT_ID ,"passport")

module.exports = function( passport ) {
    passport.use( new GoogleStrategy( {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback'

    }, 

    // https://accounts.google.com/signin/oauth/error?authError=ChVyZWRpcmVjdF91cmlfbWlzbWF0Y2gSsAEKWW91IGNhbid0IHNpZ24gaW4gdG8gdGhpcyBhcHAgYmVjYXVzZSBpdCBkb2Vzbid0IGNvbXBseSB3aXRoIEdvb2dsZSdzIE9BdXRoIDIuMCBwb2xpY3kuCgpJZiB5b3UncmUgdGhlIGFwcCBkZXZlbG9wZXIsIHJlZ2lzdGVyIHRoZSByZWRpcmVjdCBVUkkgaW4gdGhlIEdvb2dsZSBDbG91ZCBDb25zb2xlLgogIBptaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vaWRlbnRpdHkvcHJvdG9jb2xzL29hdXRoMi93ZWItc2VydmVyI2F1dGhvcml6YXRpb24tZXJyb3JzLXJlZGlyZWN0LXVyaS1taXNtYXRjaCCQAyo6CgxyZWRpcmVjdF91cmkSKmh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hdXRoL2dvb2dsZS9jYWxsYmFjaw%3D%3D&client_id=844377857676-ou9prvnkgdltae07cvc6dnn218gvljva.apps.googleusercontent.com
    async ( accessToken, refreshToken, profile, done ) => {
        console.log( profile );
        console.log( profile.name.familyName )
        console.log( profile.id )
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.familyName,
            lastName: profile.name.givenName,
            image: profile.photos[0].value
        }
        // try {
        //     let user = await User.findOne( { googleId: profile.id } );

        //     if ( user ) {
        //         done( null, user );
        //     } else {
        //         user = await User.create( newUser );
        //         done( null, user );
        //     }
        // } catch ( err ) {
        //     console.error( err );
        // }
    } ) );

    passport.serializeUser( ( user, done ) => {
        done( null, user.id );
    } );

    passport.deserializeUser( function( id, done ) {
        User.findById( id, ( ( err, user ) => done( err, user ) ) );
    } );
}