var gulp = require('gulp');

gulp.task('upkeep', function(){
  gulp.watch('app.js', function(){
    console.log('The file changed');
  });
});

gulp.task('default', function(){
  console.log('hello again');
});