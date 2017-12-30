'use-strict';

const gulp = require('gulp');
// const gutil = require('gulp-util' );
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('gulp-webpack');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');
const ftp = require('vinyl-ftp');
const notify = require("gulp-notify");

// Скрипты проекта

let platform = '';

gulp.task('js', () => {
	return gulp.src([
		'app/'+platform+'/js/common.js',
		])
		.pipe(webpack({
			devtool: 'source-map',
			module: {
				loaders: [
					{ test: /\.js$/, loader: 'babel-loader'},
				],
			},
			output: {
				filename: 'common.js'
			}
		}))
		.pipe(gulp.dest('app/'+platform+'/js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', () => {
	browserSync({
		server: {
			baseDir: 'app/'+platform
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', () => {
	return gulp.src('app/'+platform+'/sass/**/*.sass')
		.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		// .pipe(cleanCSS()) // Опционально, закомментировать при отладке
		.pipe(gulp.dest('app/'+platform+'/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], () => {
	gulp.watch('app/'+platform+'/sass/**/*.sass', ['sass']);
	gulp.watch('app/'+platform+'/js/common.js', ['js']);
	gulp.watch('app/'+platform+'/*.html', browserSync.reload);
});

gulp.task('imagemin', () => {
	return gulp.src('app/'+platform+'/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/'+platform+'/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], () => {

	const buildFiles = gulp.src([
		'app/'+platform+'/*.html',
		]).pipe(gulp.dest('dist/'+platform));

	const buildCss = gulp.src([
		'app/'+platform+'/css/main.min.css',
		]).pipe(gulp.dest('dist/'+platform+'/css'));

	const buildJs = gulp.src([
		'app/'+platform+'/js/scripts.min.js',
		]).pipe(gulp.dest('dist/'+platform+'/js'));

	const buildFonts = gulp.src([
		'app/'+platform+'/fonts/**/*',
		]).pipe(gulp.dest('dist/'+platform+'/fonts'));

});

gulp.task('removedist', () => { return del.sync('dist'); });
gulp.task('clearcache', () => { return cache.clearAll(); });

gulp.task('desktop', () => {
  platform = 'desktop';
  gulp.start('watch')
});

gulp.task('mobile', () => {
  platform = 'mobile';
  gulp.start('watch')
});

gulp.task('default', ['desktop']);
