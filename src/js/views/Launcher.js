pinball.Launcher = (function(){
  function Launcher() {
    _.bindAll(this, 'update', 'animate', 'launcherClickedHandler');
    this.stopped = false;
    this.reverse = false;
    this.increment = 13;
    this.emitter = _.extend({}, Backbone.Events);
  }

  Launcher.prototype.render = function() {
    this.$el = $(templates.launcher());
    this.$el.on('click', this.launcherClickedHandler);

    this.$progress = this.$el.find('.progress');
    this.update();
    return this;
  };

  Launcher.prototype.launcherClickedHandler = function(e) {
    e.preventDefault();
    this.stopped = true;
    this.emitter.trigger('launcher.selected', this.calculatePercentage());
  };

  Launcher.prototype.calculatePercentage = function() {
    var pw = this.$progress.parent().width();
    var perc = (this.$progress.width() / pw ) * 100;

    perc = (perc > 100) ? 100 : perc;

    if (perc <= 50) {
      this.$progress.addClass('bad');
    }
    else {
      this.$progress.removeClass('bad');
    }

    return (isNaN(perc)) ? 0 : perc;
  };

  /**
   * Increase the width of the launcher until it reaches 100%, then decrease it until it's 0% and vice versa.
   * @return {[type]} [description]
   */
  Launcher.prototype.animate = function() {
    var perc = this.calculatePercentage();

    if (perc >= 100 || perc === 0) {
      this.reverse = !this.reverse;
    }

    var calc = (this.reverse) ? '-' : '+';

    this.$progress.css({'width': calc + '=' + this.increment + '%'});
  };

  Launcher.prototype.update = function() {
    if (!this.stopped) {
      this.animate();
      requestAnimationFrame(this.update);
    }
  };

  return Launcher;
})();