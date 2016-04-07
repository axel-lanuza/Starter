'use strict';

// Define dependencies
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const atImport = require('postcss-import');
const vars = require('postcss-simple-vars');
const cssnano = require('gulp-cssnano');
const util = require('gulp-util');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babel = require('babelify');
const browserSync = require('browser-sync');


// Compile postCSS
gulp.task('styles', () => {
  var processors = [
    autoprefixer,
    atImport,
    vars
  ];

  return gulp.src('./src/css/style.css')
    .pipe(postcss(processors))
    .on('error', function(error) {
      console.log('\n ✖ ✖ ✖ ✖ ✖ ERROR ✖ ✖ ✖ ✖ ✖ \n \n' + error.message + '\n \n');
    })
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});


// scripts task
gulp.task('scripts', function() {
  browserify('./src/js/app.js')
    .transform(babel, {
      presets: ['es2015']
    })
    .bundle()
    .on('error', function(e) {
      util.log(e);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});


// Static server + watching scss, js, html files
gulp.task('serve', ['styles', 'scripts'], () => {
  browserSync.init({
    server: '.'
  });
  gulp.watch('src/css/**/*.css', ['styles']);
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});


// default task
gulp.task('default', ['serve']);
