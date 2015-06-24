var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  parker = require('gulp-parker');


// Compile sass to compressed css andd add vendor prefixes
gulp.task('styles', function () {
  gulp.src('./sass/style.scss')
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .on('error', function (error) {
      console.log('- - - ERROR - - - \n' + error.message);
    })
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox >= 20'],
    }))
    .pipe(gulp.dest('./css'));
});


// Concatenate files and minify to output to scripts.min.js
gulp.task('scripts', function () {
  gulp.src(['./js/script1.js', './js/script2.js'])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .on('error', function (error) {
      console.log('- - - ERROR - - - \n' + error.message);
    })
    .pipe(gulp.dest('./js'));
});


// Watch sass and js changes
gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('js/**/*.js', ['scripts']);
});


// CSS analysis tool
gulp.task('parker', function() {
  return gulp.src('./css/style.css')
    .pipe(parker());
});


// default task
gulp.task('default', ['watch']);
