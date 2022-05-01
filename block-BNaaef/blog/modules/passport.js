var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var User = require('../model/User');

passport.use(
    new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback'
    },(accessToken, refreshToken, profile, done) => {
        const userProfile = {
            name: profile.displayName,
            email: profile._json.email,
            username: profile.username
        }
        User.findOne({email: userProfile.email}, (error, user) => {
            if(error) return done(error);
            if(!user){
                User.create(userProfile, (error, addedUser) => {
                    return done(null, addedUser);
                })
            }else{
                return done(null,user);
            }
        })
    }
    )
)

passport.serializeUser((user, done)=>{
    console.log(user, "serilizeeee");
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    User.findById(userId, (error, user) => {
        done(error, user)
    })
})