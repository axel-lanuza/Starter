var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  rename = require("gulp-rename");


// Compile sass, minify css, autoprefix
gulp.task('sass', function () {
  gulp.src('./sass/style.scss')
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .on('error', function (err) {
      console.log(err.message);
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'));
});


// Minify js files
gulp.task('uglify', function () {
  gulp.src('./js/scripts.js')
    .pipe(uglify())
    .on('error', function (err) {
      console.log(err.message);
    })
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('./js'));
});


// Watch sass and js changes
gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('js/**/*.js', ['uglify']);
});


// default task
gulp.task('default', ['watch']);