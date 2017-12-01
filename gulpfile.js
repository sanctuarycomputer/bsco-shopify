'use strict';


/**
  * Includes
  *
  **/
var gulp      = require('gulp'),

autoprefixer  = require('gulp-autoprefixer'),
babel         = require('gulp-babel'),
changed       = require('gulp-changed'),
concat        = require('gulp-concat'),
eslint        = require('gulp-eslint'),
gutil         = require('gulp-util'),
plumber       = require('gulp-plumber'),
rename        = require('gulp-rename'),
sass          = require('gulp-sass'),
sourcemaps    = require('gulp-sourcemaps'),
uglify        = require('gulp-uglify');


/**
  * All relevent paths
  *
  **/
var dest  = './assets/';
var src   = {
  fonts   : './_src/fonts/**',
  images  : './_src/images/**',
  js      : './_src/js/app.js',
  scss    : './_src/scss/app.scss',
};

var watch = {
  js: [
    './_src/js/*.js',
    './_src/js/**/*.js',
  ],
  scss: [
    './_src/scss/*.scss',
    './_src/scss/**/*.scss',
  ],
  images: './_src/image/*.{jpg,jpeg,png,gif,svg}',
  fonts: './_src/font/*.{eot,svg,ttf,woff,woff2}'
};


/**
  * Tasks
  *
  **/
gulp.task('styles', function () {
  gulp.src(src.scss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
      })
      .on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
      browsers: ['last 3 versions', '> 5%', 'Explorer >= 10'],
      cascade: false
    }))
    .pipe(rename('bsco.css'))
    .pipe(gulp.dest(dest));
});

gulp.task('scripts', function() {
  return gulp.src(src.js)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(concat('bsco.js'))
    .pipe(babel({ presets: ['es2015'] })) 
    .pipe(gulp.dest(dest))
    .pipe(rename('bsco.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest));
});

gulp.task('images', function() {
  return gulp.src(src.images)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
});

gulp.task('fonts', function() {
  return gulp.src(src.fonts)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
});


/**
  * Watch setup
  *
  **/
gulp.task('watch', function () {
  gulp.watch(watch.scss, ['styles']);
  gulp.watch(watch.js, ['scripts']);
  gulp.watch(watch.images, ['images']);
  gulp.watch(watch.fonts, ['fonts']);
}); 


/**
  * Default setup
  *
  **/
gulp.task('default', ['images', 'fonts', 'styles', 'scripts', 'watch']);
