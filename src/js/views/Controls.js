pinball.ControlsView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'home',
  template: templates.controls,
  events: {
    'click [data-action="trigger"]': 'triggerClickedHandler'
  },
  initialize: function() {

  },
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  triggerClickedHandler: function(e) {
    e.preventDefault();
    var trigger = $(e.currentTarget).data('trigger');

    this.app.socket.emit('arduino.controls', {trigger: trigger});
  }
});