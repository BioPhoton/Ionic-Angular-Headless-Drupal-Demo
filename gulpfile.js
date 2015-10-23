var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['scss/ionic.app.scss', 'www/app/**/scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
	
  gulp.src(paths.sass)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(concat('ionic.app.css'))
    .pipe(gulp.dest('www/assets/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('www/assets/css/'))
    .on('end', done);
});

/*Move font files form resources into assets/fonts directory so that our css @font-face's will resolve their files*/
gulp.task('move-images', function() {
	//fontawesome
	var imgFrom = 'files/images/default-avatar.png';
		imgTo = 'www/assets/images';
	gulp.src(imgFrom)
     	.pipe(gulp.dest(imgTo))
     	.on('end', function(){  gutil.log(gutil.colors.green('moved image from '+imgFrom+' to '+imgTo)); });
  
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
