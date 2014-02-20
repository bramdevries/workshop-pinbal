pinball.ScoreView = Backbone.View.extend({
  tagName: 'div',
  className: 'full',
  id: 'score',
  template: templates.score,
  events: {
    'click [data-action="again"]': 'replay'
  },
  initialize: function(options) {
    this.score = options.score;
    this.sound = new buzz.sound('media/start', {formats: ['mp3']});
  },
  render: function() {
    this.$el.html(this.template({score: this.score}));
    return this;
  },
  replay: function(e) {
    e.preventDefault();
    this.sound.play();

    Backbone.history.navigate('/', {trigger: true});
    window.location.reload();

  }
});