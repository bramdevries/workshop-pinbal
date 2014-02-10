var frontControllers;

frontControllers ={
  'index': function (req, res, next) {
    return res.render('home');
  },
  'adjustServo': function(req, res, next) {

    return res.redirect('/');
  }
};

module.exports = frontControllers;