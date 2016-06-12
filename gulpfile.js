var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function(){
  gulp
    .src('scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', ['default'], function(){
  gulp.watch('scss/**/*', ['styles']);
});

gulp.task('default', ['styles']);