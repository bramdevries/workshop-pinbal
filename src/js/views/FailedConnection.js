pinball.FailedConnectionView = Backbone.View.extend({
  tagName: 'div',
  className: 'container',
  id: 'connectionFailed',
  template: templates.failedConnection,
  initialize: function() {

  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});