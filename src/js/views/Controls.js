pinball.ControlsView = Backbone.View.extend({
  tagName: 'div',
  className: 'full',
  id: 'controls',
  template: templates.controls,
  hasBack: true,
  events: {
    'click [data-action="trigger"]': 'triggerClickedHandler'
  },
  initialize: function() {
    _.bindAll(this, 'targetHit');
    this.sound = new buzz.sound('media/flipper', {formats: ['mp3']});
    this.soundHit = new buzz.sound('media/hit', {formats: ['mp3']});
  },
  render: function() {
    this.$el.html(this.template());
    this.app.socket.on('target.hit', this.targetHit);

    this.app.socket.on('arduino.score', this.app.scoreReceived);

    return this;
  },
  targetHit: function(id) {
    this.$el.find('[data-pin=' + id.id + ']').addClass('hit');
    this.soundHit.play();
  },
  triggerClickedHandler: function(e) {
    e.preventDefault();
    this.sound.play();
    var trigger = $(e.currentTarget);

    var deg = '-=15deg';

    if (trigger.hasClass('right')) {
      deg = '+=15deg';
    }

    if (!trigger.hasClass('disabled')) {
      trigger.addClass('disabled');
      trigger.transition({
        rotate: '0deg'
      }, 100).transition({
        rotate: (trigger.hasClass('right')) ? '-15deg' : '15deg'
      }, function(){
        trigger.removeClass('disabled');
      });

      this.app.socket.emit('arduino.trigger', {trigger: trigger.data('trigger'), access_token: this.app.access_token});
    }
  }
});