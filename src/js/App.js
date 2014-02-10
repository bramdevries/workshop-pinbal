pinball.App = Backbone.View.extend({
  tagName: "div",
  className: "container",
  id: "app",
  initialize: function() {
    _.bindAll(this, "connectedHandler");

    this.socket = io.connect(window.location);
    this.loader = new pinball.LoadingView(this.$el);
    this.loader.start('Connecting with Arduino');

    this.socket.on('arduino.connected', this.connectedHandler);
  },
  connectedHandler: function() {
    this.loader.stop();
  }
});