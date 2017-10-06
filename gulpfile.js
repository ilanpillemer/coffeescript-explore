var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

var jsSources = ['components/scripts/script.js']; 

gulp.task('js' , function() {
    gulp.src(jsSources)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('js'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(jsSources, ['js']);
    gulp.watch(['js/script.js','*.html'], function(e) {
//        livereload.changed(e);
        livereload.reload();
    });
});

gulp.task('default', ['js','watch']);
