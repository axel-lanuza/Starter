// Define dependencies
import gulp from 'gulp';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';
import vars from 'postcss-simple-vars';
import cssnano from 'gulp-cssnano';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';


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
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});


// Concatenate files and minify to output to scripts.min.js
gulp.task('scripts', () => {
  gulp.src([
    './src/js/script1.js',
    './src/js/script2.js'
  ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .on('error', function(error) {
      console.log('\n ✖ ✖ ✖ ✖ ✖ ERROR ✖ ✖ ✖ ✖ ✖ \n \n' + error.message + '\n \n');
    })
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});


// Static server + watching scss, js, html files
gulp.task('serve', ['styles', 'scripts'], () => {
  browserSync.init({
    server: '.'
  });
  gulp.watch('src/css/**/*.css', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});


// default task
gulp.task('default', ['serve']);
