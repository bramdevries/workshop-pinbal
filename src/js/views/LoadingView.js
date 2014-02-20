pinball.LoadingView = Backbone.View.extend({
  tagName: 'div',
  className: 'full',
  id: 'loader',
  template: templates.loading,
  initialize: function(el, message) {
    this.$parent = $(el);
    this.message = message || '';
  },
  render: function() {
    this.$el.html(this.template());
    this.$parent.html(this.$el);
    this.$el.find('.page').append('<p class="help">' + this.message +'</p>');
  },
  start: function(message) {
    this.message = message;
    this.render();
    return this;
  },
  stop: function() {
    this.$el.remove();
    return this;
  }
});