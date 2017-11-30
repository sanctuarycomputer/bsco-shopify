'use strict';

/**
  * Includes
  *
  **/
var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

/**
  * All relevent paths
  *
  **/
var dest = './assets/';
var src = {
  fonts   : './_src/fonts/**',
  images  : './_src/images/**',
  js      : './_src/js/app.js',
  scss    : './_src/scss/app.scss',
};

/**
  * Tasks
  *
  **/
gulp.task('styles', function () {
  gulp.src(src.scss)
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
  gulp.watch(['./_src/scss/*.scss', './_src/scss/**/*.scss'], ['styles']);
  gulp.watch(['./_src/js/*.js', './_src/js/**/*.js'], ['scripts']);
  gulp.watch('./_src/image/*.{jpg,jpeg,png,gif,svg}', ['images']);
  gulp.watch('./_src/font/*.{eot,svg,ttf,woff,woff2}', ['fonts']);
}); 

/**
  * Default setup
  *
  **/
gulp.task('default', ['images', 'fonts', 'styles', 'scripts', 'watch']);
