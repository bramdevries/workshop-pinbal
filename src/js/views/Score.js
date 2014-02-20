pinball.ScoreView = Backbone.View.extend({
  tagName: 'div',
  className: 'full',
  id: 'score',
  template: templates.score,
  initialize: function(options) {
    this.score = options.score;
  },
  render: function() {
    this.$el.html(this.template({score: this.score}));
    return this;
  }
});