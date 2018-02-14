var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var concat = require ('gulp-concat');


// Static Server + watching scss/html files through BrowserSync
gulp.task('default', function() {

    //specify which folder should be synced to the browser
    browserSync.init({
        server: "./build",
        browser: ["google chrome"]
    });

    //watch for changes in scss and html folders, and compile if changed
    gulp.watch("./src/scss/**/*.scss", ['sass']);
    gulp.watch("./src/html/*.html", ['copy-html']);
    gulp.watch("./src/js/*.js", ['scripts']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
        gulp.src([
          './src/scss/style.scss'
          ])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

// Concat js files to a single file
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

// Copy html to build file
gulp.task('copy-html', function() {
    gulp.src('./src/html/*.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});
