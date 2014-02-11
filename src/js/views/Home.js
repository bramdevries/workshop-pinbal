/**
 * Player selection screen: Show the amount of connected Arduino's.
 */
pinball.HomeView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'home',
  template: templates.players,
  events: {
    'click [data-action="select"]': 'playerSelected',
  },
  initialize: function(options) {
    this.players = options.players;
  },
  playerSelected: function(e) {
    e.preventDefault();
    var player_id = $(e.currentTarget).data('player');
  },
  render: function() {
    this.$el.html(this.template({players: this.players}));
    return this;
  }
});