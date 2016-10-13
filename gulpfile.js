/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    gulpfile.js

    Automation
    -Watches for updates for files
    -Removes logs/debugs from the client side.
    -Minifies the Bundles and CSS
    ========================================================================== */
var gulp  = require('gulp');

// Plugins
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer'); // Vinyl stream support
var merge = require('utils-merge'); // Object merge tool

// Bundles
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

// JS
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

// CSS
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./public/bundles/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Minifies, removes loggers, and concats all files for home
gulp.task('homejs', function() {
  gulp.src([
  	'./public/javascripts/socket.js',
  	'./public/javascripts/jquery.min.js',
  	'./public/javascripts/bootstrap.min.js',
  	'./public/bundles/homeBundle.js',
  	'./public/javascripts/drag-arrange.js'])
    .pipe(concat('home.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});

// Minifies, removes loggers, and concats all files for room
gulp.task('roomjs', function() {
  gulp.src([
  	'./public/javascripts/constantVariables.js',
  	'./public/javascripts/objectInit.js',
  	'./public/javascripts/socket.js',

  	'./public/javascripts/jquery.min.js',
  	'./public/javascripts/bootstrap.min.js',
  	'./public/javascripts/jquery.mCustomScrollbar.concat.min.js',

  	'./public/javascripts/youtube.js', 
  	'./public/bundles/roomBundle.js',
  	'./public/javascripts/drag-arrange.js', 
	'./public/javascripts/script.js'])
  .pipe(concat('room.js'))
  .pipe(stripDebug())
  .pipe(uglify())
  .pipe(gulp.dest('./build/scripts/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src('./public/stylesheets/style.css')
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});

// Browserifies the given bundle type
function toBrowserify(bundleType) {
  var args = merge(watchify.args, { debug: true });

  var bundler = browserify('./public/browserify/' + bundleType + '.js', args)
  .plugin(watchify)
  .transform(babelify, {presets: ['es2015', 'react']})

  function bundleFiles() {
    console.log("Browserify Bundling " + bundleType);
    bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error ' + bundleType))
    .pipe(source(bundleType + 'Bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public/bundles'));
  }

  bundler.on('update', bundleFiles);
  bundleFiles();
}

// Home
gulp.task('home-browserify', toBrowserify('home'));

// Room
gulp.task('room-browserify', toBrowserify('room'));

// Browserifies all files into the bundles
gulp.task('browserify', ['home-browserify', 'room-browserify']);

// Watches for file changes
gulp.task('watch', function() {
  gulp.watch('./public/bundles/homeBundle.js', ['homejs']);
  gulp.watch('./public/bundles/roomBundle.js', ['roomjs']);
  gulp.watch('./public/stylesheets/style.css', ['styles']);
});

// Bundles
gulp.task('bundle', ['browserify', 'homejs', 'roomjs']);

// Default gulp task
gulp.task('default', ['bundle', 'watch']);

