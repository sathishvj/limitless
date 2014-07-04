var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var imageResize = require('gulp-image-resize');

var paths = {
  sass: ['./scss/**/*.scss'],
  assets: ['./assets/**/*.png']
};

//gulp.task('default', ['sass']);
gulp.task('default', ['watch']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'));
    //.on('end', done);

  gulp.src('./scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('assets-android-icon', function(done) {
	gulp.src('./assets/android/limitless-icon-96x96.png')
		.pipe(rename({basename: 'icon'}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable/'))
		.pipe(imageResize({ 
			width : 96,
			height : 96
		}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable-xhdpi/'))
		.pipe(imageResize({ 
			width : 72,
			height : 72
		}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable-hdpi/'))
		.pipe(imageResize({ 
			width : 48,
			height : 48
		}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable-mdpi/'))
		.pipe(imageResize({ 
			width : 36,
			height : 36
		}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable-ldpi/'))
		.on('end', done);
});

gulp.task('assets-android-screen', function(done) {
	gulp.src('./assets/android/limitless-screen-land-1280x720.png')
		.pipe(rename({basename: 'screen'}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable-land-xhdpi/'))
		.pipe(imageResize({ 
			width : 800,
			height : 480
		}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable-land-hdpi/'))
		.pipe(imageResize({ 
			width : 480,
			height : 320
		}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable-land-mdpi/'))
		.pipe(imageResize({ 
			width : 320,
			height : 200
		}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable-land-ldpi/'))
		;

	gulp.src('./assets/android/limitless-screen-port-720x1280.png')
		.pipe(rename({basename: 'screen'}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable-port-xhdpi/'))
		.pipe(imageResize({ 
			width : 480,
			height : 800
		}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable-port-hdpi/'))
		.pipe(imageResize({ 
			width : 320,
			height : 480
		}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable-port-mdpi/'))
		.pipe(imageResize({ 
			width : 200,
			height : 320
		}))
		.pipe(gulp.dest('./platforms/android/ant-build/res/drawable-port-ldpi/'))
		.on('end', done);
});

gulp.task('assets-ios-icon', function(done) {
	gulp.src('./assets/android/limitless-icon-96x96.png')
		.pipe(rename({basename: 'icon-76@2x'}))
		.pipe(imageResize({ 
			width : 152,
			height : 152
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon-72@2x'}))
		.pipe(imageResize({ 
			width : 144,
			height : 144
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon-60@2x'}))
		.pipe(imageResize({ 
			width : 120,
			height : 120
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon@2x'}))
		.pipe(imageResize({ 
			width : 114,
			height : 114
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon-50@2x'}))
		.pipe(imageResize({ 
			width : 100,
			height : 100
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon-40@2x'}))
		.pipe(imageResize({ 
			width : 80,
			height : 80
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon-76'}))
		.pipe(imageResize({ 
			width : 76,
			height : 76
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon-72'}))
		.pipe(imageResize({ 
			width : 72,
			height : 72
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon-60'}))
		.pipe(imageResize({ 
			width : 60,
			height : 60
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon-small@2x'}))
		.pipe(imageResize({ 
			width : 58,
			height : 58
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon'}))
		.pipe(imageResize({ 
			width : 57,
			height : 57
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon-50'}))
		.pipe(imageResize({ 
			width : 50,
			height : 50
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon-40'}))
		.pipe(imageResize({ 
			width : 40,
			height : 40
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.pipe(rename({basename: 'icon-small'}))
		.pipe(imageResize({ 
			width : 29,
			height : 29
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/icons'))
		.on('end', done);
});

gulp.task('assets-ios-splash', function(done) {
	gulp.src('./assets/android/limitless-screen-land-1280x720.png')
		.pipe(rename({basename: 'Default-Landscape@2x~ipad'}))
		.pipe(imageResize({ 
			width : 2048,
			height : 1536
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/splash'))
		.pipe(rename({basename: 'Default-Landscape~ipad'}))
		.pipe(imageResize({ 
			width : 1024,
			height : 768
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/splash'))
		.pipe(rename({basename: 'Default-Landscape~ipad'}))
		.pipe(imageResize({ 
			width : 1024,
			height : 768
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/splash'))
		;

	gulp.src('./assets/android/limitless-screen-port-720x1280.png')
		.pipe(rename({basename: 'Default-Portrait@2x~ipad'}))
		.pipe(imageResize({ 
			width : 1536,
			height : 2048
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/splash'))
		.pipe(rename({basename: 'Default-Portrait~ipad'}))
		.pipe(imageResize({ 
			width : 768,
			height : 1024
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/splash'))
		.pipe(rename({basename: 'Default-568h@2x~iphone'}))
		.pipe(imageResize({ 
			width : 640,
			height : 1136
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/splash'))
		.pipe(rename({basename: 'Default@2x~iphone'}))
		.pipe(imageResize({ 
			width : 640,
			height : 960
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/splash'))
		.pipe(rename({basename: 'Default~iphone'}))
		.pipe(imageResize({ 
			width : 320,
			height : 480
		}))
		.pipe(gulp.dest('./platforms/ios/limitless/Resources/splash'))
		.on('end', done);
});


gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.assets, ['assets-android-icon', 'assets-android-screen', 'assets-ios-icon', 'assets-ios-splash']);
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
