var User = require('../model/User');
module.exports = {
    isUserLogged: (req, res, next) => {
        if(req.session.user || req. session.passport){
            return next()
        }
        return res.redirect('/');
    },userInfo: (req, res, next) => {
        if(req.session.passport){
            var userId = req.session.passport.user;
             User.findById(userId, (error, user) => {
                 console.log(user, "auth");
                 if(error) return next(error);
                 res.locals.user = user;
                 next()
             })
        }else{
            res.locals.user = null;
            next()
        }
    }
}