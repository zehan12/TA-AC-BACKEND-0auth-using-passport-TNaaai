var express = require('express');
var router = express.Router();
var Article = require('../model/Article');
var Comment = require('../model/Comment');
var auth = require('../middlewares/auth');

// get all articles
router.get('/', (req, res, next) => {
  console.log(req.session, "sessionccc");
  Article.find({}, (error, articles) => {
    if (error) return next(error);
    const fullName = req.flash('fullName')[0];
    res.render('articles', { articles, fullName});
  });
});

router.use(auth.isUserLogged);
// send form
router.get('/new',  (req, res, next) => {
  res.render('form');
});
// create new form
router.post('/', (req, res, next) => {
  req.body.tags = req.body.tags.split(',').map((ele) => ele.trim());
  // return res.send(req.body);
  Article.create(req.body, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

// get article details
router.get('/:slug', (req, res, next) => {
  let slug = req.params.slug;
  Article.findOne({ slug })
    .populate('comments')
    .exec((err, article) => {
      if (err) return next(err);
      res.render('articleDetails', { article });
    });
});
// likes
router.get('/:slug/like', (req, res, next) => {
  let slug = req.params.slug;
  Article.findOneAndUpdate({ slug }, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/' + slug);
  });
});

// dislikes
router.get('/:slug/dislike', (req, res, next) => {
  let slug = req.params.slug;
  Article.findOneAndUpdate(
    { slug },
    { $inc: { dislikes: 1 } },
    (err, article) => {
      if (err) return next(err);
      res.redirect('/articles/' + slug);
    }
  );
});

// edit
router.get('/:slug/edit', (req, res, next) => {
  let slug = req.params.slug;
  Article.findOne({ slug }, (err, article) => {
    if (err) return next(err);
    article.tags = article.tags.reduce((acc, ele, i, arr) => {
      acc += ele;
      if (i !== arr.length - 1) {
        acc += ',';
      }
      return acc;
    }, '');
    res.render('editarticle', { article });
  });
});

// update
router.post('/:slug/update', (req, res, next) => {
  let slug = req.params.slug;
  req.body.tags = req.body.tags.split(',').map((ele) => ele.trim());
  Article.findOneAndUpdate({ slug }, req.body, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/' + article.slug);
  });
});

//delete
router.get('/:slug/delete', (req, res, next) => {
  let slug = req.params.slug;
  Article.findOneAndDelete({ slug }, (err, article) => {
    if (err) return next(err);
    Comment.deleteMany({ articleId: article._id }, (err, comment) => {
      if (err) return next(err);
      res.redirect('/articles');
    });
  });
});

module.exports = router;
