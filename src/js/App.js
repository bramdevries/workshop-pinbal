pinball.App = Backbone.View.extend({
  tagName: "div",
  id: "app",
  events: {
    'click [data-action="link"]': 'linkClickedHandler'
  },
  initialize: function() {
    _.bindAll(this, 'playtime', 'scoreReceived');

    this.socket = io.connect(window.location);

    this.loader = new pinball.LoadingView(this.$el);
    //this.loader.start('Setting up connection to Arduino');

    this.socket.on('arduino.playtime', this.playtime);
    //this.socket.on('arduino.score', this.scoreReceived);
  },
  playtime: function(data){
    // Show the launch screen.
    this.access_token = data.access_token;
    this.socket.of('arduino.spectator', this.spectator);
    this.setView(new pinball.HomeView());
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