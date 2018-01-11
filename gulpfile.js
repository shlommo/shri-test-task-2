'use-strict';

const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const mqpacker = require('css-mqpacker');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const webpack = require('gulp-webpack');
const mocha = require('gulp-mocha');

let platform = 'desktop';

gulp.task('style', function () {
  gulp.src(`${platform}/app/sass/main.sass`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
        ]
      }),
      mqpacker({sort: true})
    ]))
    .pipe(gulp.dest(`${platform}/build/css`))
    .pipe(server.stream())
    .pipe(minify())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(`${platform}/build/css`))
    .pipe(server.stream());
});

gulp.task('scripts', function () {
  gulp.src(`${platform}/app/js/common.js`)
    .pipe(plumber())
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
    .pipe(gulp.dest(`${platform}/build/js/`))
    .pipe(server.stream());
});

require('babel-register');
gulp.task('test', function () {
  return gulp
    .src([`${platform}/app/js/**/*.test.js`], { read: false })
    .pipe(mocha({
      compilers: {
        js: 'babel-register' // Включим поддержку "import/export" в Mocha
      },
      reporter: 'spec'       // Вид в котором я хочу отображать результаты тестирования
    }));
});

gulp.task('imagemin', ['copy'], function () {
  gulp.src(`${platform}/build/img/**/*.{jpg,png,gif}`)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest(`${platform}/build/img`));
});


gulp.task('copy-html', function () {
  gulp.src(`${platform}/app/*.html`)
    .pipe(gulp.dest(`${platform}/build`))
    .pipe(server.stream());
});

gulp.task('copy', ['copy-html', 'scripts', 'style'], function () {
  gulp.src([
    `${platform}/app/fonts/**/*.*`,
  ])
    .pipe(gulp.dest(`${platform}/build/fonts/`));
  gulp.src([
    `${platform}/app/img/**/*.*`
  ])
    .pipe(gulp.dest(`${platform}/build/img/`));
});

gulp.task('clean', function () {
  return del(`${platform}/build`);
});

gulp.task('serve', ['assemble'], function () {
  server.init({
    server: `./${platform}/build`,
    notify: false,
    open: true,
    port: 3501,
    ui: false
  });

  gulp.watch(`${platform}/app/sass/**/*.{scss,sass}`, ['style']);
  gulp.watch(`${platform}/app/*.html`).on('change', (e) => {
    if (e.type !== 'deleted') {
      gulp.start('copy-html');
    }
  });
  gulp.watch(`${platform}/app/js/**/*.js`, ['scripts']).on('change', server.reload);
});

gulp.task('assemble', ['clean'], function () {
  gulp.start('copy', 'style');
});

gulp.task('build', ['assemble', 'imagemin']);

gulp.task('desktop', function () {
  platform = 'desktop';
  gulp.start('serve');
});

gulp.task('mobile', function () {
  platform = 'mobile';
  gulp.start('serve');
});
