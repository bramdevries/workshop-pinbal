pinball.ControlsView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'home',
  template: templates.controls,
  hasBack: true,
  events: {
    'click [data-action="trigger"]': 'triggerClickedHandler'
  },
  initialize: function() {
    this.previousView = pinball.HomeView;
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  triggerClickedHandler: function(e) {
    e.preventDefault();
    var trigger = $(e.currentTarget).data('trigger');

    this.app.socket.emit('arduino.trigger', {trigger: trigger, access_token: this.app.access_token});
  }
});