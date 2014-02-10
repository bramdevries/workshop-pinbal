var frontControllers;

frontControllers ={
  'index': function (req, res, next) {
    return res.render('default');
  }
};

module.exports = frontControllers;