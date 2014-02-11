/**
 * Interface to set the force of the launch.
 * - Shows a graphic that will be filled for a specific percentage, when clicked it freezes and the current percentage will be used
 *   to determine the force of the launch.
 * - When that's done, we show the controls for the triggers.
 */
pinball.LaunchView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'launch',
  template: templates.launch,
  initialize: function(options) {
  },
  render: function() {
    this.$el.html(this.template({players: this.players}));
    return this;
  }
});