// Define dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var nano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var parker = require('gulp-parker');
var jscs = require('gulp-jscs');
var scsslint = require('gulp-scss-lint');
var browserSync = require('browser-sync').create();

// Compile sass to compressed css andd add vendor prefixes
gulp.task('styles', function() {
  gulp.src('./sass/style.scss')
    .pipe(sass())
    .on('error', function(error) {
      console.log('- - - ERROR - - - \n' + error.message);
    })
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox >= 20']
    }))
    .pipe(nano())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// Concatenate files and minify to output to scripts.min.js
gulp.task('scripts', function() {
  gulp.src(['./js/script1.js', './js/script2.js'])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .on('error', function(error) {
      console.log('- - - ERROR - - - \n' + error.message);
    })
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

// CSS analysis tool
gulp.task('parker', function() {
  return gulp.src('./css/style.css')
    .pipe(parker());
});

// Lint .js files
gulp.task('js-lint', function() {
  return gulp.src(['js/script1.js', 'js/script2.js', './gulpfile.js'])
    .pipe(jscs());
});

// Lint .scss files
gulp.task('scss-lint', function() {
  gulp.src('sass/**/*.scss')
    .pipe(scsslint());
});

// Static server + watching scss, js, html files
gulp.task('serve', ['styles', 'scripts'], function() {
  browserSync.init({
    server: '.'
  });
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

// default task
gulp.task('default', ['serve']);
