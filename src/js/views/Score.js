pinball.ScoreView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'score',
  template: templates.score,
  initialize: function(options) {
  },
  render: function() {
    this.$el.html(this.template({players: this.players}));
    return this;
  }
});