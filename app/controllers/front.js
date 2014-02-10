var frontControllers;

frontControllers ={
  'index': function (req, res, next) {
    return res.render('home');
  }
};

module.exports = frontControllers;