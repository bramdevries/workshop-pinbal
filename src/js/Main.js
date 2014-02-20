$(function() {
  FastClick.attach(document.body);
});

var app = new pinball.App();

$('#container').append(app.render().$el);