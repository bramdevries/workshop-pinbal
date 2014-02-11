pinball.HomeView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'home',
  template: templates.home,
  initialize: function() {

  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});