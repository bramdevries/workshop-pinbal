
pinball.HomeView = Backbone.View.extend({
  tagName: 'div',
  className: 'full',
  template: templates.home,
  events: {
    'click [data-action="play"]': 'startGame'
  },
  initialize: function(options) {
  },
  render: function() {
    this.$el.html(this.template({devices: this.devices}));
    return this;
  },
  startGame: function(e) {
    e.preventDefault();
    this.app.setView(new pinball.LaunchView());
  }
});