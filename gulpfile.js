var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");

// Скрипты проекта

var platform = '';

gulp.task('js', function() {
	return gulp.src([
		'app/'+platform+'/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/'+platform+'/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app/'+platform
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('app/'+platform+'/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/'+platform+'/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/'+platform+'/sass/**/*.sass', ['sass']);
	gulp.watch('app/'+platform+'/js/common.js', ['js']);
	gulp.watch('app/'+platform+'/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/'+platform+'/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/'+platform+'/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'app/'+platform+'/*.html',
		]).pipe(gulp.dest('dist/'+platform));

	var buildCss = gulp.src([
		'app/'+platform+'/css/main.min.css',
		]).pipe(gulp.dest('dist/'+platform+'/css'));

	var buildJs = gulp.src([
		'app/'+platform+'/js/scripts.min.js',
		]).pipe(gulp.dest('dist/'+platform+'/js'));

	var buildFonts = gulp.src([
		'app/'+platform+'/fonts/**/*',
		]).pipe(gulp.dest('dist/'+platform+'/fonts'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('desktop', function() {
  platform = 'desktop';
  gulp.start('watch')
});

gulp.task('mobile', function() {
  platform = 'mobile';
  gulp.start('watch')
});
