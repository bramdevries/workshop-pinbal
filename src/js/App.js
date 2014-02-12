pinball.App = Backbone.View.extend({
  tagName: "div",
  className: "container",
  id: "app",
  events: {
    'click [data-action="link"]': 'linkClickedHandler'
  },
  initialize: function() {
    _.bindAll(this, 'playtime', 'spectator', 'scoreReceived');

    this.socket = io.connect(window.location);

    /*this.loader = new pinball.LoadingView(this.$el);
    this.loader.start('Setting up connection to Arduino');*/

    this.socket.on('arduino.playtime', this.playtime);
    this.socket.on('arduino.spectator', this.spectator);
    this.socket.on('arduino.score', this.scoreReceived);
  },
  spectator: function(e) {
    // Show the score screen.
    this.setView(new pinball.ScoreView());
  },
  playtime: function(data){
    // Show the launch screen.
    this.access_token = data.access_token;
    this.setView(new pinball.LaunchView());
  },
  scoreReceived: function(data) {
    this.setView(new pinball.ScoreView({score: data.score}));
  },
  setView: function(v) {
    v.app = this;
    this.$el.html(v.render().$el);
  },
  linkClickedHandler: function(e) {
    e.preventDefault();
    var view = $(e.currentTarget).data('view');
    switch(view) {
      case 'controls': this.setView(new pinball.ControlsView()); break;
    }
  }
});