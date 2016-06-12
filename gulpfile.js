var gulp = require('gulp');

gulp.task('watch', function(){
  gulp.watch('app.js', function(){
    console.log('The file changed');
  });
});

gulp.task('default', function(){
  console.log('hello again');
});