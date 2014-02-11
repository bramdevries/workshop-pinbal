var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    cssminify  = require('gulp-minify-css'),
    autoprefix = require('gulp-autoprefixer'),
    watch      = require('gulp-watch'),
    handlebars = require('gulp-handlebars'),
    uglify     = require('gulp-uglify'),
    concat     = require('gulp-concat'),
    header     = require('gulp-header'),
    footer     = require('gulp-footer'),
    livereload = require('gulp-livereload'),
    lr         = require('tiny-lr'),
    server     = lr();

/**
 * Styles
 */

gulp.task('styles', function(){
  gulp.src('./src/scss/style.scss')
    .pipe(sass({errLogToConsole:true}))
    .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload(server));
});

gulp.task('styles:build', function(){
  gulp.src('./src/scss/style.scss')
    .pipe(sass({errLogToConsole:true}))
    .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(cssminify())
    .pipe(gulp.dest('./public/css'));
});

/**
 * Scripts
 */

/**
 * Javascript
 */

var pkg = require('./package.json');
var banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' */',
  '(function(){',
  'var <%= pkg.name %> = {};',
  ''].join('\n');

var foot = [
  '})();',
].join('\n');

gulp.task('scripts', function(){
  gulp.src([
    './src/js/Helpers.js',
    './src/js/templates.js',
    './src/js/views/*.js',
    './src/js/router.js',
    './src/js/App.js',
    './src/js/Main.js'
    ])
    .pipe(concat('app.js'))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(footer(foot))
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload(server));
});

gulp.task('handlebars', function () {
  gulp.src(['src/templates/*.hbs'])
    .pipe(handlebars())
    .pipe(concat('templates.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./src/js'));
});

/**
 * Default task
 */
gulp.task('default', function () {

  gulp.run(['styles', 'handlebars', 'scripts']);

  server.listen(35729, function(err){
    if (err) {return console.log(err);}
    gulp.watch('./src/scss/**/*.scss', ['styles']);
    // Restart gulp when changing this file.
    gulp.watch('./gulpfile.js', ['default']);
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/templates/*.hbs', ['handlebars']);
  });
});