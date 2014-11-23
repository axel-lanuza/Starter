var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename"),
  imagemin = require('gulp-imagemin'),
  pagespeed = require('psi');


// Compile sass, minify css, autoprefix
gulp.task('sass', function () {
	gulp.src('./sass/style.scss')
		.pipe(sass({
      style: 'compressed',
      precision: 4
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


// optimize images
gulp.task('imagemin', function () {
  return gulp.src('./img/source/*')
    .pipe(imagemin({
        progressive: false,
        svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('./img'));
});


// show speed test rank
gulp.task('pagespeed', pagespeed.bind(null, {
  url: 'http://studiorgb.uk',
  strategy: 'mobile'
}));