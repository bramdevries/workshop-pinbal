/**
 * Interface to set the force of the launch.
 * - Shows a graphic that will be filled for a specific percentage, when clicked it freezes and the current percentage will be used
 *   to determine the force of the launch.
 * - When that's done, we show the controls for the triggers.
 */
pinball.LaunchView = Backbone.View.extend({
  tagName: 'div',
  className: 'full',
  id: 'launch',
  template: templates.launch,
  logo: true,
  initialize: function(options) {
    _.bindAll(this, 'launcherSelectedHandler', 'angleSetHandler');
    this.launcher = new pinball.Launcher();
    this.launcher.emitter.on('launcher.selected', this.launcherSelectedHandler);

    this.sound = new buzz.sound('media/launch', {formats: ['mp3']});

    $('#page-logo-wrapper').removeClass('hidden');
  },
  render: function() {
    this.$el.html(this.template({players: this.players}));
    this.$el.find('.page').append(this.launcher.render().$el);
    return this;
  },
  launcherSelectedHandler: function(perc) {
    this.app.socket.emit('arduino.launcher_set', {percentage: perc, access_token: this.app.access_token});
    this.app.socket.on('arduino.angle_set', this.angleSetHandler);
    this.sound.play();
  },
  angleSetHandler: function() {
    this.app.setView(new pinball.ControlsView());
  }
});