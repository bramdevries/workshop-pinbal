var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    cssminify  = require('gulp-minify-css'),
    autoprefix = require('gulp-autoprefixer'),
    watch      = require('gulp-watch'),
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
 * Default task
 */
gulp.task('default', function () {
  server.listen(35729, function(err){
    if (err) {return console.log(err);}
    gulp.watch('./src/scss/**/*.scss', ['styles']);
    // Restart gulp when changing this file.
    gulp.watch('./gulpfile.js', ['default']);
  });
});