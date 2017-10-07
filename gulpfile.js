var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-ruby-sass'),
    coffee = require('gulp-coffee')
;

var jsSources = [
    'components/lib/jquery/jquery.js',
    'components/scripts/*.js'

];

var sassSources = ['components/sass/*.scss'];
var coffeeSources = ['components/coffee/*.coffee'];


gulp.task('sass', () =>
	  sass(sassSources, {style:"expanded", lineNumbers:true})
	  .on('error', sass.logError)
          .pipe(concat('styles.css'))
          .pipe(gulp.dest('css'))
          .pipe(livereload())
         );

gulp.task('js' , () =>
          gulp.src(jsSources)
          .pipe(uglify())
          .pipe(concat('script.js'))
          .pipe(gulp.dest('js'))
          .pipe(livereload())
         );

gulp.task("coffee", () =>
          gulp.src(coffeeSources, { sourcemaps: true })
          .pipe(coffee({ bare: true }))
          .pipe(gulp.dest('components/scripts'))
         );

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['sass']);
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(['js/script.js','*.html'], function(e) {
        livereload.reload();
    });
});

gulp.task('default', ['sass','js','coffee','watch']);
