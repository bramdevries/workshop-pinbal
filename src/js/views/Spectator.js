pinball.SpectatorView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'spectator',
  template: templates.spectator,
  initialize: function(options) {
    this.position = options.position;
  },
  render: function() {
    this.$el.html(this.template({position: this.position}));
    return this;
  }
});