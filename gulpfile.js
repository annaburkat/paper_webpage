// --------------------------------------------
// Dependencies
// --------------------------------------------
var autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  del = require('del'),
  gulp = require('gulp'),
  validator = require('gulp-html'),
  minifycss = require('gulp-minify-css'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  images = require('gulp-imagemin'),
  browserSync = require('browser-sync').create();

// paths
var styleSrc = 'source/scss/**/*.scss',
  styleDest = 'build/assets/css/',
  htmlSrc = 'source/',
  htmlDest = 'build/',
  vendorSrc = 'source/js/vendors/',
  vendorDest = 'build/assets/js/',
  scriptSrc = 'source/js/*.js',
  scriptDest = 'build/assets/js/';


// --------------------------------------------
// Stand Alone Tasks
// --------------------------------------------

// Validate html files
gulp.task('html', function() {
  gulp.src('source/*.html')
    .pipe(validator())
    .pipe(gulp.dest('build/'));
});

// Compiles all local SASS files
gulp.task('sass', function() {
  gulp.src('source/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      style: 'compressed'
    }))
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/assets/css'));
});

// Compile scss plugin's files
gulp.task('vendors-sass', function() {
  return gulp.src(
      [
        'node_modules/bootstrap/scss/bootstrap.scss',
        'node_modules/slick-carousel/slick/slick.scss',
        'node_modules/slick-carousel/slick/slick-theme.scss'
      ])
    .pipe(plumber())
    .pipe(sass({
      style: 'compressed'
    }))
    .pipe(concat("vendors-sass.css"))
    .pipe(sass())
    .pipe(gulp.dest("build/assets/css"))
    .pipe(browserSync.stream());
});


gulp.task('images', function() {
  gulp.src('source/img/*')
    .pipe(images())
    .pipe(gulp.dest('build/assets/img'));
});

// gulp.task('favicon', function() {
//   gulp.src('source/favicon/*')
//     .pipe(gulp.dest('build/'));
// });

gulp.task('font', function() {
  gulp.src('node_modules/slick-carousel/slick/fonts/*')
    .pipe(gulp.dest('build/assets/fonts'));
});

// Uglify js files
gulp.task('scripts', function() {
  gulp.src('source/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'));
});

//Concat and Compress Vendor .js and plugin's files
gulp.task('vendors', function() {
  gulp.src(
      [
        'source/js/vendors/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/slick-carousel/slick/slick.js',
        'source/js/vendors/*.js'
      ])
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'));
});


// Watch for changes
gulp.task('watch', function() {
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./build"
    },
    notify: false
  });

  gulp.watch(styleSrc, ['sass']);
  gulp.watch(scriptSrc, ['scripts']);
  gulp.watch(vendorSrc, ['vendors']);
  gulp.watch(['build/*.html', 'build/assets/css/*.css', 'build/assets/js/*.js', 'build/assets/js/vendors/*.js']).on('change', browserSync.reload);
});


// use default task to launch Browsersync and watch JS files
gulp.task('default', ['sass', 'scripts', 'vendors', 'watch', 'vendors-sass', 'font', 'images', 'html'], function() {});
