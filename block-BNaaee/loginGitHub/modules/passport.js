const passport = require( 'passport' ),    
        GitHubStrategy = require( 'passport-github2' ).Strategy;

var User = require( '../models/User' );

passport.use( new GitHubStrategy( {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback",
    scope: [ 'user:email' ]
}, ( accessToken, refreshToken, profile, done ) => {
    console.log( profile );

    var userProfile = {
        name: profile.displayName,
        username: profile.username,
        photo: profile._json.avatar_url,
        email: profile.emails[0].value
    }
    console.log(profile.emails[0].value,"email search")

    User.findOne( { email: profile.emails[0].value }, ( err, user ) => {
        console.log( err, ":err", user, ":user found" )
        if ( err )  return done( err, null );
        if ( !user ) {
            User.create( userProfile, ( err, addedUser ) =>{
                console.log( addedUser ,":user created", err,":err")
                if (err) return done(err);
            return done( null, addedUser )
            })
        }
            console.log(user,"user alreay there")
            return done( null, user )

    } )
} ) )

passport.serializeUser( ( user, done ) => {
    done( null, user.id )
} );

passport.deserializeUser( function( id, done ) {
    User.findById( id, "name email", function( err, user ){
        done( err, user );
    } )
} )