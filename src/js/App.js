pinball.App = Backbone.View.extend({
  tagName: "div",
  id: "app",
  events: {
    'click [data-action="link"]': 'linkClickedHandler',
    'click [data-action="mute"]': 'mute'
  },
  initialize: function() {
    _.bindAll(this, 'playtime', 'scoreReceived');

    this.socket = io.connect(window.location);

    this.loader = new pinball.LoadingView(this.$el);
    this.loader.start('Connecting to pinball machine');

    this.socket.on('arduino.playtime', this.playtime);

    // Background music
    this.sndBg = new buzz.sound('media/bg', {formats: ['mp3']});
    this.sndBg.play().loop().setVolume(0).fadeTo(20, 400);
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
    this.$el.prepend('<a href="#" data-action="mute" class="ss-icon toggle-sound">highvolume</a>');
  },
  linkClickedHandler: function(e) {
    e.preventDefault();
    var view = $(e.currentTarget).data('view');
    switch(view) {
      case 'controls': this.setView(new pinball.ControlsView()); break;
    }
  },
  mute: function(e) {
    e.preventDefault();

    this.sndBg.toggleMute();

    if (this.sndBg.isMuted()) {
      $(e.currentTarget).html('volume');
    }
    else {
      $(e.currentTarget).html('highvolume');
    }
  }
});