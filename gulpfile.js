// --------------------------------------------
// Dependencies
// --------------------------------------------
var autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  del = require('del'),
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  csso = require('gulp-csso'),
  images = require('gulp-imagemin'),
  clean = require('gulp-clean'),
  htmlmin = require('gulp-htmlmin'),
browserSync = require('browser-sync').create();

// paths
var styleSrc = 'source/scss/**/*.scss',
  styleDest = 'build/assets/css/',
  htmlSrc = 'source/*.html',
  htmlDest = 'build/*.html',
  vendorSrc = 'source/js/vendors/',
  vendorDest = 'build/assets/js/',
  scriptSrc = 'source/js/*.js',
  scriptDest = 'build/assets/js/';

// Tasks
gulp.task('reload', function(){
  browserSync.reload();
});

// Validate & minify html files
gulp.task('html', ['images'], function() {
  gulp.src('source/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

// Compiles all local SASS files
gulp.task('sass', function() {
  gulp.src('source/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      style: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(csso())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('build/assets/css'))
    .pipe(browserSync.stream());
});

// Compile vendor SCSS files
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
    .pipe(csso())
    .pipe(concat("vendors-sass.css"))
    .pipe(gulp.dest("build/assets/css"))
    .pipe(browserSync.stream());
});

// Compile vendor CSS files
gulp.task('vendors-css', function() {
  return gulp.src([
      'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
      'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
    ])
    .pipe(csso())
    .pipe(concat("vendors-css.css"))
    .pipe(gulp.dest("build/assets/css"))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  gulp.src('source/img/*')
    .pipe(images())
    .pipe(gulp.dest('build/assets/img'));
});

gulp.task('favicon', function() {
  gulp.src('source/favicon/*')
    .pipe(gulp.dest('build/'));
});

//fonts for plugins
gulp.task('webfonts', function() {
  gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest('build/assets/webfonts'));
});

gulp.task('fonts', function() {
  gulp.src('node_modules/slick-carousel/slick/fonts/*')
    .pipe(gulp.dest('build/assets/css/fonts'));
});


gulp.task('gif', function() {
  gulp.src('node_modules/slick-carousel/slick/ajax-loader.gif')
    .pipe(gulp.dest('build/assets/css'));
});

// Uglify js files
gulp.task('scripts', function() {
  gulp.src('source/js/app.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'))
    .pipe(browserSync.stream());
});

//Concat and Compress Vendor .js and plugin's files
gulp.task('vendors', function() {
  gulp.src(
      [
        'source/js/vendors/*.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/@fortawesome/fontawesome-free/js/all.min.js',
        'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js'
      ])
      .pipe(plumber())
      .pipe(concat('vendors.js'))
      .pipe(uglify())
      .pipe(gulp.dest('build/assets/js/vendors'))
    .pipe(browserSync.stream());
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

  gulp.watch(htmlSrc, ['html']);
  gulp.watch(styleSrc, ['sass']);
  gulp.watch(scriptSrc, ['scripts']);
  gulp.watch(vendorSrc, ['vendors']);
  gulp.watch(['build/*.html', 'build/assets/css/*.css', 'build/assets/js/*.js', 'build/assets/js/vendors/*.js', 'build/assets/img/*']).on('change', browserSync.reload);
});

gulp.task('clean', function() {
  return gulp.src('build/*', {
      read: false
    })
    .pipe(clean());
});


// use default task to launch Browsersync and watch files
gulp.task('default', ['images', 'sass', 'scripts', 'vendors-sass', 'vendors-css', 'html', 'favicon',  'webfonts', 'fonts', 'vendors', 'gif', 'watch'], function() {});
