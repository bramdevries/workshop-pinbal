
pinball.HomeView = Backbone.View.extend({
  tagName: 'div',
  className: 'full',
  template: templates.home,
  events: {
    'click [data-action="play"]': 'startGame'
  },
  initialize: function(options) {
    this.sound = new buzz.sound('media/start', {formats: ['mp3']});
  },
  render: function() {
    this.$el.html(this.template({devices: this.devices}));
    return this;
  },
  startGame: function(e) {
    e.preventDefault();
    this.sound.play();
    this.app.setView(new pinball.LaunchView());
  }
});