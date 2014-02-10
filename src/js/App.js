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
  changeView: function(v) {
    this.$el.html(v.render().$el);
    v.app = this;
  },
  connectedHandler: function() {
    this.loader.stop();

    // Show initial view.
    this.changeView(new pinball.ServoTestView());
  }
});