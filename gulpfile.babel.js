// Define dependencies
import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import nano from 'gulp-cssnano';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import parker from 'gulp-parker';
import browserSync from 'browser-sync';


// Compile sass to compressed css andd add vendor prefixes
gulp.task('styles', () => {
  return gulp.src('./src/sass/style.scss')
    .pipe(sass())
    .on('error', function(error) {
      console.log('\n ✖ ✖ ✖ ✖ ✖ ERROR ✖ ✖ ✖ ✖ ✖ \n \n' + error.message + '\n \n');
    })
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox >= 20']
    }))
    .pipe(nano())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});


// Concatenate files and minify to output to scripts.min.js
gulp.task('scripts', () => {
  return gulp.src([
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


// CSS analysis tool
gulp.task('parker', () => {
  return gulp.src('./css/style.css')
    .pipe(parker());
});


// Static server + watching scss, js, html files
gulp.task('serve', ['styles', 'scripts'], () => {
  browserSync.init({
    server: '.'
  });
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});


// default task
gulp.task('default', ['serve']);
