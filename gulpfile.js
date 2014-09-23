var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename");


gulp.task('sass', function () {
	gulp.src('./sass/style.scss')
		.pipe(plumber())
		.pipe(sass({
      style: 'compressed',
      precision: 4
    }))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./css'));
});

gulp.task('uglify', function () {
	gulp.src('./js/script.js')
		.pipe(uglify())
		.pipe(rename('script.min.js'))
		.pipe(gulp.dest('./js'));
});


gulp.task('watch', function() {
	gulp.watch('sass/**/*.scss', ['sass']);
	gulp.watch('js/**/*.js', ['uglify']);
});


gulp.task('default', ['watch']);