// Define dependencies
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const atImport = require('postcss-import');
const vars = require('postcss-simple-vars');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
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


// Concatenate files and minify to output to scripts.min.js
gulp.task('scripts', () => {
  gulp.src('./src/js/app.js')
    .pipe(uglify())
    .on('error', function(error) {
      console.log('\n ✖ ✖ ✖ ✖ ✖ ERROR ✖ ✖ ✖ ✖ ✖ \n \n' + error.message + '\n \n');
    })
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
