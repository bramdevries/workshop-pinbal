/**
 * Player selection screen: Show the amount of connected Arduino's.
 */
pinball.HomeView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'home',
  template: templates.devices,
  events: {
    'click [data-action="select"]': 'deviceSelected',
  },
  initialize: function(options) {
    this.devices = options.devices;
  },
  deviceSelected: function(e) {
    e.preventDefault();
    this.app.device_id = $(e.currentTarget).data('device_id');
    this.app.socket.emit('arduino.selected', {device_id: this.app.device_id});

    // Go to launch setup.
    this.app.changeView(new pinball.LaunchView());
  },
  render: function() {
    this.$el.html(this.template({devices: this.devices}));
    return this;
  }
});