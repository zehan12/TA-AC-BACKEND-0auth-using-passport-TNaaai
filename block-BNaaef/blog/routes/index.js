var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Our Blog' });
});

router.get('/auth/github', passport.authenticate('github'));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/articles')
  }
);

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/');
})
module.exports = router;
