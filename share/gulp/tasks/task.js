var gulp = require('/home/vagrant/gulp/node_modules/gulp');
var spawn = require('child_process').spawn;

var angular2_dir = "/home/vagrant/angular2-quickstart";

gulp.task('default', ['copy', 'watch', 'angular2']);

gulp.task('copy',function(){
    var base_dir = "/home/vagrant/share/angular2",
        dist_dir = angular2_dir;
    return gulp.src(
        [ base_dir + '/*', base_dir + '/app/*' ],
        { "base": base_dir }
    )
    .pipe( gulp.dest( dist_dir ) );
});

gulp.task('angular2', function(){
  spawn('npm',['start'], {cwd:angular2_dir});
});

gulp.task('watch',['copy'],function(){
  gulp.watch(['/home/vagrant/share/angular2/**'], ['copy']);
});
