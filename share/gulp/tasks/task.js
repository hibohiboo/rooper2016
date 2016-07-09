var gulp = require('/home/vagrant/gulp/node_modules/gulp');
var spawn = require('child_process').spawn;

gulp.task('default', ['copy', 'watch']);

gulp.task('copy',function(){
    var base_dir = "/home/vagrant/share/angular2",
        dist_dir = "/home/vagrant/angular2-quickstart";
    return gulp.src(
        [ base_dir + '/*.*', base_dir + '/app/*' ],
        { "base": base_dir }
    )
    .pipe( gulp.dest( dist_dir ) );
});

gulp.task('watch',['copy'],function(){
  gulp.watch(['/home/vagrant/share/angular2/index.html', '/home/vagrant/share/angular2/app/*'], ['copy']);
});
